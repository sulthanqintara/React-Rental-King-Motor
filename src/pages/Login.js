import axios from "axios";
import { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Footer from "../components/Footer";
import googleIcon from "../assets/img/icon/google-icon.png";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  render() {
    const email = this.state.email;
    const password = this.state.password;
    const submitHandler = () => {
      const form = new URLSearchParams();
      form.append("email", email);
      form.append("password", password);
      console.log(form);
      axios
        .post(`http://localhost:8000/auth/login`, form)
        .then((res) => {
          localStorage.setItem("token", String(res.data.result.token));
          this.props.history.push("/");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          // console.log(error.config);
        });
    };
    return (
      <>
        <main className="login-background">
          <div
            className="
            shadow-container
            d-lg-flex
            flex-lg-center
            justify-content-between
          "
          >
            <div className="bd-highlight sign-up">
              <div>
                <p className="login-title">
                  Let's Explore <br />
                  The World
                </p>
                <p className="no-account">Don't have account?</p>
                <Link to="/register">
                  <button className="sign-up-btn-custom">Sign Up</button>
                </Link>
              </div>
            </div>
            <div className="bd-highlight line"></div>
            <div className="bd-highlight login-field">
              <form>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  autoComplete="email"
                />
                <p></p>
                <input
                  type="password"
                  id="pass"
                  name="pass"
                  placeholder="Password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  autoComplete="current-password"
                />
              </form>

              <div className="forgot-password">
                <Link to="/forgot">Forgot Password?</Link>
              </div>
              <div>
                <button className="btn-login-page" onClick={submitHandler}>
                  Login
                </button>
              </div>
              <div>
                <Link to="/">
                  <button className="btn-login-with-google">
                    <img src={googleIcon} alt="" />
                    Login With Google
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
export default withRouter(Login);
