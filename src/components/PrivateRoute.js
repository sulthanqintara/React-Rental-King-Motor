// import { Children } from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute(children, ...rest) {
  const token = localStorage.getItem("token");
  return (
    <Route
      render={() => {
        if (!token) {
          return children;
        } else {
          return <Redirect to={"/auth"} />;
        }
      }}
      {...rest}
    />
  );
}

export default PrivateRoute;
