import React from 'react';
import { Route } from 'react-router-dom';
import { Login } from 'components';
import { useFirebaseAuth } from 'hooks';
import { PrivateRouteProps } from 'models';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
    const { activeUser } = useFirebaseAuth();

    return <Route {...rest} component={getRouteComponent} />;

    function getRouteComponent() {
        return activeUser ? children : <Login />;
    }
};

export { PrivateRoute };
