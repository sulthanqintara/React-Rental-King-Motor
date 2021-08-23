import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import Reservation from "../pages/Reservation";

function AppWithRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/auth" component={Login} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/profile" component={Profile} />
      <Route path="/reservation" component={Reservation} />
    </Router>
  );
}

export { AppWithRouter };
