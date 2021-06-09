import React from "react";
import { Redirect, Route } from "react-router-dom";
const PrivateRoute = ({ component: Component, data, authed, ...rest }) => {
  const isLoggedIn = authed;
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
