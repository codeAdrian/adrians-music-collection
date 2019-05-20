import React, { useEffect } from 'react';
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
    useEffect(firebaseAuthListener);

    return (
        <div>
            Login
            <Form
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Fields.email render={getEmailInput} />
                        <Fields.password render={getPasswordInput} />
                        <button type='submit'>Log in</button>
                    </form>
                )}
            />
        </div>
    );

    function firebaseAuthListener() {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log('user', user);
            user && setIsSignedIn(true);
        });
    }

    function handleSubmit(values: LoginForm) {
        const { email, password } = values;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => error);
    }

    function getEmailInput({
        input,
        meta
    }: FieldRenderProps<string, 'email', any>) {
        return (
            <Input label='Email' type='email' meta={meta} required {...input} />
        );
    }

    function getPasswordInput({
        input,
        meta
    }: FieldRenderProps<string, 'password', any>) {
        return (
            <Input
                label='Password'
                type='password'
                meta={meta}
                required
                {...input}
            />
        );
    }
};

export default Login;
