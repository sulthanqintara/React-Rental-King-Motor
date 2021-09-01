import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import googleIcon from "../assets/img/icon/google-icon.png";

import Footer from "../components/Footer";

function Register() {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userName, setName] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const onSubmit = () => {
    if (userName.length < 1) {
      setShowMessage(true);
      setErrorMessage("Username is Required");
    } else if (userName.length < 6) {
      setShowMessage(true);
      setErrorMessage("Username must have 6 or more characters!");
    } else if (email.length < 1) {
      setShowMessage(true);
      setErrorMessage("Email is Required");
    } else if (!email.includes("@")) {
      setShowMessage(true);
      setErrorMessage("Please input a Valid Email");
    } else if (password.length < 1) {
      setShowMessage(true);
      setErrorMessage("Password is Required");
    } else if (password.length < 6) {
      setShowMessage(true);
      setErrorMessage("Password must have 6 or more characters!");
    } else {
      const form = new URLSearchParams();
      form.append("name", userName);
      form.append("email", email);
      form.append("password", password);
      console.log(form);
      axios
        .post(`http://localhost:8000/auth/register`, form)
        .then((res) => history.push({ pathname: "/", status: true }))
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
        });
    }
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
            padding-register
            "
        >
          <div className="bd-highlight sign-up">
            <div>
              <p className="login-title">
                Let's Explore <br />
                The World
              </p>
              <p className="no-account">Already Have an Account?</p>
              <Link to="/auth">
                <button className="sign-up-btn-custom">Login</button>
              </Link>
            </div>
          </div>
          <div className="bd-highlight line"></div>
          <div className="bd-highlight login-field">
            <form>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                onChange={(e) => setName(e.target.value)}
                value={userName}
                autoComplete="off"
              />
              <br></br>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="email"
              />
              <p></p>
              <input
                type="password"
                id="pass"
                name="pass"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="current-password"
              />
            </form>
            {showMessage && (
              <div className="my-3 bg-white p-2 rounded fw-bold fs-5 text-center text-danger">
                {errorMessage}
              </div>
            )}
            <div className="forgot-password"></div>
            <div>
              <button className="btn-login-page" onClick={onSubmit}>
                Sign Up
              </button>
            </div>
            <div>
              <Link to="/">
                <button className="btn-login-with-google">
                  <img src={googleIcon} alt="" />
                  Sign Up With Google
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

export default Register;
