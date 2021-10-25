import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
// import { postLogin } from "../utils/https/Auth";
import { connect } from "react-redux";
import { loginAction } from "../redux/actionCreators/auth";

import Footer from "../components/Footer";
import googleIcon from "../assets/img/icon/google-icon.png";
import Loader from "react-loader-spinner";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const submitHandler = () => {
    if (email.length < 1) {
      setErrorMessage("Email is Required");
      setLoadingState(false);
      return setShowMessage(true);
    }
    if (!email.includes("@")) {
      setErrorMessage("Please Input a Valid Email");
      setLoadingState(false);
      return setShowMessage(true);
    }
    if (password.length < 1) {
      setErrorMessage("Password is Required");
      setLoadingState(false);
      return setShowMessage(true);
    }
    if (password.length < 6) {
      setErrorMessage("Password Must Have 6 or More Characters");
      setLoadingState(false);
      return setShowMessage(true);
    }
    setErrorMessage("");
    setShowMessage(false);
    const form = new URLSearchParams();
    form.append("email", email);
    form.append("password", password);
    props.onLogin(form);
  };
  useEffect(() => {
    if (props.auth.isLogin) {
      setLoadingState(false);
      setShowMessage(false);
      setErrorMessage("");
      props.history.push("/");
    }
    if (props.auth.error) {
      setErrorMessage("Invalid Email or Password");
      setLoadingState(false);
      return setShowMessage(true);
    }
  }, [props.auth.error, props.auth.isLogin, props.history]);
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
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <p></p>
              <input
                type="password"
                id="pass"
                name="pass"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </form>
            {showMessage && (
              <div className="my-3 bg-white p-2 rounded fw-bold fs-5 text-center text-danger">
                {errorMessage}
              </div>
            )}
            <div className="forgot-password">
              <Link to="/forgot">Forgot Password?</Link>
            </div>
            <div>
              <button
                className="btn-login-page"
                onClick={() => {
                  setLoadingState(true);
                  submitHandler();
                }}
              >
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
      {loadingState && (
        <div className="loader loader-modal">
          <Loader type="TailSpin" color="#ffcd61" height={80} width={80} />
        </div>
      )}
      <Footer />
    </>
  );
};

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
