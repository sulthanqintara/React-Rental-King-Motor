import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import Reservation from "../pages/Reservation";
import Register from "./SignUp";
import Vehicles from "./Vehicles";
import ViewDetail from "./ViewDetail";
import Payment from "./Payment";
import ChatDetail from "./ChatDetail";
import History from "./History";
import { PrivateRoute, AuthRoute } from "../components/PrivateRoute";

class AppWithRouter extends Component {
  state = {
    isLogin: false,
  };
  componentDidMount() {
    const data = localStorage.getItem("token");
    if (data) {
      this.setState({ isLogin: true });
    }
  }

  render() {
    return (
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
        <Route path="vehicles">
          <Vehicles {...this.props} />
        </Route>
        <PrivateRoute path="/reservation/:id">
          <Reservation {...this.props} />
        </PrivateRoute>
        <Route path="/detail/:id">
          <ViewDetail {...this.props} />
        </Route>
        <PrivateRoute path="/payment">
          <Payment />
        </PrivateRoute>
        <PrivateRoute path="/chat">
          <ChatDetail />
        </PrivateRoute>
        {/* <Route
          path="/history"
          render={() => {
            if (this.state.isLogin) {
              return <History />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        /> */}

        <PrivateRoute path="/history">
          <History />
        </PrivateRoute>
      </Router>
    );
  }
}

export { AppWithRouter };
