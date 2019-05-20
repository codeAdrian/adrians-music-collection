import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Login } from 'components/Login';

interface PrivateRouteProps {
    children: JSX.Element;
    exact: boolean;
    path: string;
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    return <Route {...rest} component={getRouteComponent} />;

    function getRouteComponent() {
        return isSignedIn ? children : <Login setIsSignedIn={setIsSignedIn} />;
    }
};

export default PrivateRoute;
