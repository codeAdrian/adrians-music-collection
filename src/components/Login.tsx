import React from 'react';
import defineForm from 'react-define-form';
import { Input } from 'components';
import { FieldRenderProps } from 'react-define-form';
import { useFirebaseAuth } from 'hooks';

const { Form, Fields } = defineForm(f => ({
    email: f<string>(),
    password: f<string>()
}));

const Login = () => {
    const { signIn } = useFirebaseAuth();

    return (
        <div>
            Login
            <Form
                initialValues={{ email: '', password: '' }}
                onSubmit={signIn}
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

export { Login };
