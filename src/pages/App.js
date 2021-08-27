import { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import Reservation from "../pages/Reservation";
import Register from "./SignUp";
import vehicleType from "./Vehicle-type";
import ViewDetail from "./ViewDetail";
import Payment from "./Payment";
import ChatDetail from "./ChatDetail";
import History from "./History";

class AppWithRouter extends Component {
  state = {
    reserved: 1,
    token: "",
    isLogin: false,
  };
  addReserve = () => {
    this.setState((prevState) => {
      return {
        reserved: prevState.reserved + 1,
      };
    });
  };
  rmvReserve = () => {
    this.setState((prevState) => {
      if (this.state.reserved > 1) {
        return {
          reserved: prevState.reserved - 1,
        };
      }
    });
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
            console.log(this.state.isLogin);
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
            console.log(this.state.isLogin);
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
            console.log(this.state.isLogin);
            if (this.state.isLogin) {
              return <Profile />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/reservation"
          render={() => {
            if (this.state.isLogin) {
              return (
                <Reservation
                  addReserve={this.addReserve}
                  rmvReserve={this.rmvReserve}
                  reservedState={this.state.reserved}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route path="/vehicle-type" component={vehicleType} />
        <Route
          path="/detail/:id"
          render={() => {
            if (this.state.isLogin) {
              return (
                <ViewDetail
                  addReserve={this.addReserve}
                  rmvReserve={this.rmvReserve}
                  reservedState={this.state.reserved}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/payment"
          render={() => {
            if (this.state.token !== "") {
              return <Payment />;
            } else {
              return <Redirect to="/auth" />;
            }
          }}
        />
        <Route
          path="/chat"
          render={() => {
            if (this.state.token !== "") {
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
