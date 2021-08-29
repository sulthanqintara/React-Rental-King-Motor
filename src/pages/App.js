import { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

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
        <Route path="/" exact render={() => <Home />} />
        <Route
          path="/auth"
          render={() => {
            if (!this.state.isLogin) {
              return <Login />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/register"
          render={() => {
            if (!this.state.isLogin) {
              return <Register />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/forgot"
          render={() => {
            if (!this.state.isLogin) {
              return <ForgotPassword />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/profile"
          render={() => {
            if (this.state.isLogin) {
              return <Profile />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route path="/vehicles" render={(props) => <Vehicles {...props} />} />
        <Route
          path="/reservation/:id"
          render={(props) => {
            if (this.state.isLogin) {
              return (
                <Reservation
                  {...props} //spread operator
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/detail/:id"
          render={(props) => <ViewDetail {...props} />}
        />
        <Route
          path="/payment"
          render={() => {
            if (this.state.isLogin) {
              return <Payment />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/chat"
          render={() => {
            if (this.state.isLogin) {
              return <ChatDetail />;
            } else {
              return <Redirect to="/auth" />;
            }
          }}
        />
        <Route
          path="/history"
          render={() => {
            if (this.state.isLogin) {
              return <History />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
      </Router>
    );
  }
}

export { AppWithRouter };
