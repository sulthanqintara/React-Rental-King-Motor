import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
// import { postLogin } from "../utils/https/Auth";
import { connect } from "react-redux";
import { loginAction } from "../redux/actionCreators/auth";

import Footer from "../components/Footer";
import googleIcon from "../assets/img/icon/google-icon.png";

class Login extends Component {
  state = {
    email: "",
    password: "",
    showMessage: false,
    errorMessage: "",
  };
  submitHandler = () => {
    const email = this.state.email;
    const password = this.state.password;
    if (email.length < 1)
      return this.setState({
        showMessage: true,
        errorMessage: "Email is Required",
      });
    if (!email.includes("@"))
      return this.setState({
        showMessage: true,
        errorMessage: "Please input a Valid Email",
      });
    if (password.length < 1)
      return this.setState({
        showMessage: true,
        errorMessage: "Password is Required",
      });
    if (password.length < 6)
      return this.setState({
        showMessage: true,
        errorMessage: "Password must have 6 or more characters!",
      });
    if (this.props.auth.error) {
      this.setState({
        showMessage: true,
        errorMessage: "Invalid E-mail or Password!",
      });
    }
    const form = new URLSearchParams();
    form.append("email", email);
    form.append("password", password);
    this.props.onLogin(form);
  };
  componentDidUpdate() {
    if (this.props.auth.isLogin) {
      this.props.history.push("/");
    }
  }

  render() {
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
              {this.state.showMessage && (
                <div className="my-3 bg-white p-2 rounded fw-bold fs-5 text-center text-danger">
                  {this.state.errorMessage}
                </div>
              )}
              <div className="forgot-password">
                <Link to="/forgot">Forgot Password?</Link>
              </div>
              <div>
                <button className="btn-login-page" onClick={this.submitHandler}>
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
const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (body) => {
      dispatch(loginAction(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
