import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { Login } from 'components/Login';

interface PrivateRouteProps {
    redirectTo: string;
    component: React.FunctionComponent;
}

const PrivateRoute = ({
    redirectTo,
    component: WrappedComponent,
    ...rest
}: PrivateRouteProps): JSX.Element => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    const getRouteComponent = (props: RouteProps) =>
        isSignedIn ? (
            <WrappedComponent {...props} />
        ) : (
            <Login setIsSignedIn={setIsSignedIn} />
        );

    return <Route {...rest} component={getRouteComponent} />;
};

export default PrivateRoute;
