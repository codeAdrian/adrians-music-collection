import React from 'react';
import defineForm from 'react-define-form';
import { Input } from 'components/Input';
import { FieldRenderProps } from 'react-define-form';
import firebase from 'firebaseInit';

const { Form, Fields } = defineForm(f => ({
    email: f<string>(),
    password: f<string>()
}));

interface LoginProps {
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginForm {
    email: string;
    password: string;
}

const Login = ({ setIsSignedIn }: LoginProps): JSX.Element => {
    setIsSignedIn(false);

    firebase
        .auth()
        .signOut()
        .then(function() {
            console.log('SUCCESS');
        })
        .catch(function(error) {
            console.log('ERROR', error);
        });

    const handleSubmit = (values: LoginForm): void => {
        const { email, password } = values;
        const query = firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => error);

        firebase.auth().onAuthStateChanged(function(user) {
            console.log('user', user);
            user && setIsSignedIn(true);
        });

        console.log('query', Promise.resolve(query));
    };

    const getUsernameInput = ({
        input,
        meta
    }: FieldRenderProps<string, 'email', any>): React.ReactNode => (
        <Input label='Username' meta={meta} {...input} />
    );

    const getPasswordInput = ({
        input,
        meta
    }: FieldRenderProps<string, 'password', any>): React.ReactNode => (
        <Input label='Password' type='password' meta={meta} {...input} />
    );

    return (
        <div>
            Login
            <Form
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Fields.email render={getUsernameInput} />
                            <Fields.password render={getPasswordInput} />
                            <button type='submit'>Log in</button>
                        </form>
                    );
                }}
            />
        </div>
    );
};

export default Login;
