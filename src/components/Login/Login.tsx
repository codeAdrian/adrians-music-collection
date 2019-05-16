import React from 'react';
import { Form, Field } from 'react-final-form';

interface LoginProps {
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setIsSignedIn }: LoginProps): JSX.Element => {
    setIsSignedIn(false);
    return <div>Login</div>;
};

export default Login;
