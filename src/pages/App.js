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
  checkLogin = (page) => {
    if (this.token !== "") {
      console.log(this.token);
      return <Redirect to={"/" + page} />;
    } else {
      return <Redirect to="/auth" />;
    }
  };

  token = localStorage.getItem("token");

  render() {
    return (
      <Router>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/auth" render={() => <Login />} />
        <Route path="/register" component={Register} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route
          path="/profile"
          render={() => {
            if (this.token !== "") {
              console.log(this.token);
              return <Profile />;
            } else {
              return <Redirect to="/auth" />;
            }
          }}
        />
        <Route
          path="/reservation"
          render={() => (
            <Reservation
              addReserve={this.addReserve}
              rmvReserve={this.rmvReserve}
              reservedState={this.state.reserved}
            />
          )}
        />
        <Route path="/vehicle-type" component={vehicleType} />
        <Route
          path="/detail/:id"
          render={() => (
            <ViewDetail
              addReserve={this.addReserve}
              rmvReserve={this.rmvReserve}
              reservedState={this.state.reserved}
            />
          )}
        />
        <Route path="/payment" render={() => <Payment />} />
        <Route path="/chat" render={() => <ChatDetail />} />
        <Route path="/history" render={() => <History />} />
      </Router>
    );
  }
}

export { AppWithRouter };
