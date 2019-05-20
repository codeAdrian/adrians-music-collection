import { useEffect, useState } from 'react';
import firebase from 'firebaseInit';

export const useFirebaseAuth = (
    callback?: (user: firebase.User | null) => void
) => {
    const [activeUser, setActiveUser] = useState<firebase.User | null>(null);
    const [authError, setAuthError] = useState<any>();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            setActiveUser(user);
            callback && callback(user);
        });
        return function cleanup() {
            setActiveUser(null);
            unsubscribe();
        };
    }, [callback]);

    function handleAuthError(error: any) {
        setAuthError(error);
    }

    function signOut() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                setActiveUser(null);
            })
            .catch(handleAuthError);
    }

    function signIn({ email, password }: { email: string; password: string }) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => error);
    }

    return {
        signIn,
        signOut,
        authError,
        activeUser
    };
};
