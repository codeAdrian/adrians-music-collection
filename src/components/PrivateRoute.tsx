import React from "react";
import { Route } from "react-router-dom";
import { Login } from "components";
import { useFirebaseAuth } from "hooks";

interface PrivateRouteProps {
  children: JSX.Element;
  exact: boolean;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const { activeUser } = useFirebaseAuth();

  return <Route {...rest} component={getRouteComponent} />;

  function getRouteComponent() {
    return activeUser ? children : <Login />;
  }
};

export { PrivateRoute };
