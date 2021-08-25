import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";

import Footer from "../components/Footer";

function Register() {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userName, setName] = React.useState("");
  const onSubmit = () => {
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
            <div className="forgot-password"></div>
            <div>
              <button className="btn-login-page" onClick={onSubmit}>
                Sign Up
              </button>
            </div>
            <div>
              <Link to="/">
                <button className="btn-login-with-google">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/b8ac/5ee0/9188114fc23c443fbf14c61b1d4c791f?Expires=1630281600&Signature=dbCH2CrqJ6XU7PGbJkDWv5xdaQpFWaLvB2U6N29io0O8lNol~QJL-zIU1jYBQ7hu6Hly5ztkegEhtQbrl6YVseFpbkZEuSXxJ7k8ZCDz9TK7XcjQ9hz-g10-HCYzoX9FUj7SAZLUTYIpBU3YzOnZLxk3NcalmJjzj3RQCH--OV0cjxpHRCh8gzE~UX2j7EnQDfUCno6flCUHHFyMfPmdYVfBA0REUxn5fJ7azyicfv03fUl4FpOdMhu8WKJK7Cw12JmnO258H3J6blZcftERmnu2GjGYOzEzvrm31QF0Nl4c0wPN14iL~LrbIYJ226AVFIxkDlKieVlbbfxoyh7JQg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                    alt=""
                  />
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
