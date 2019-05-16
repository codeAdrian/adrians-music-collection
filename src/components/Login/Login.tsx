import React from 'react';
import { Form, Field } from 'react-final-form';

interface LoginProps {
    setIsSignedIn: (
        state: boolean
    ) => React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setIsSignedIn }: LoginProps) => {
    return <div>Login</div>;
};

export default Login;
