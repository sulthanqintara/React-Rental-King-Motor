import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

export function PrivateRoute({ children, ...rest }) {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <Route
      {...rest}
      render={() => (token ? children : <Redirect to="/auth" />)}
    />
  );
}

export function AuthRoute({ children, ...rest }) {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <Route {...rest} render={() => (token ? <Redirect to="/" /> : children)} />
  );
}
