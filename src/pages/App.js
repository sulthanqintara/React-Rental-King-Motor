import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./Home";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
import Reservation from "./Reservation";
import Register from "./SignUp";
import Vehicles from "./Vehicles";
import ViewDetail from "./ViewDetail";
import Payment from "./Payment";
import ChatDetail from "./ChatDetail";
import History from "./History";
import { PrivateRoute, AuthRoute } from "../components/PrivateRoute";
import reduxStore from "../redux/store";

class AppWithRouter extends Component {
  state = {
    isLogin: false,
  };

  render() {
    return (
      <Provider store={reduxStore}>
        <Router>
          <Route path="/" exact>
            <Home />
          </Route>
          <AuthRoute path="/auth">
            <Login />
          </AuthRoute>
          <AuthRoute path="/register">
            <Register />
          </AuthRoute>
          <AuthRoute path="/forgot">
            <ForgotPassword />
          </AuthRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <Route path="/vehicles">
            <Vehicles />
          </Route>
          <PrivateRoute path="/reservation/:id">
            <Reservation />
          </PrivateRoute>
          <Route path="/detail/:id">
            <ViewDetail />
          </Route>
          <PrivateRoute path="/payment">
            <Payment />
          </PrivateRoute>
          <PrivateRoute path="/chat">
            <ChatDetail />
          </PrivateRoute>
          <PrivateRoute path="/history">
            <History />
          </PrivateRoute>
        </Router>
      </Provider>
    );
  }
}

export { AppWithRouter };
