import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";

import Footer from "../components/Footer";

function Login() {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const onSubmit = () => {
    const form = new URLSearchParams();
    form.append("email", email);
    form.append("password", password);
    console.log(form);
    axios
      .post(`http://localhost:8000/auth/login`, form)
      .then((res) => history.push({ pathname: "/", status: true }))
      .catch((err) => console.log(err));
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
              <Link to="/">
                <button className="sign-up-btn-custom">Sign Up</button>
              </Link>
            </div>
          </div>
          <div className="bd-highlight line"></div>
          <div className="bd-highlight login-field">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <p></p>
            <input
              type="text"
              id="pass"
              name="pass"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="forgot-password">
              <Link to="/forgot">Forgot Password?</Link>
            </div>
            <div>
              {/* <Link to={{ pathname: "/", status: true }}> */}
              <button className="btn-login-page" onClick={onSubmit}>
                Login
              </button>
              {/* </Link> */}
            </div>
            <div>
              <Link to="/">
                <button className="btn-login-with-google">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/b8ac/5ee0/9188114fc23c443fbf14c61b1d4c791f?Expires=1630281600&Signature=dbCH2CrqJ6XU7PGbJkDWv5xdaQpFWaLvB2U6N29io0O8lNol~QJL-zIU1jYBQ7hu6Hly5ztkegEhtQbrl6YVseFpbkZEuSXxJ7k8ZCDz9TK7XcjQ9hz-g10-HCYzoX9FUj7SAZLUTYIpBU3YzOnZLxk3NcalmJjzj3RQCH--OV0cjxpHRCh8gzE~UX2j7EnQDfUCno6flCUHHFyMfPmdYVfBA0REUxn5fJ7azyicfv03fUl4FpOdMhu8WKJK7Cw12JmnO258H3J6blZcftERmnu2GjGYOzEzvrm31QF0Nl4c0wPN14iL~LrbIYJ226AVFIxkDlKieVlbbfxoyh7JQg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                    alt=""
                  />
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

export default Login;
