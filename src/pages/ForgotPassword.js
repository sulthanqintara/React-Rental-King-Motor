import React from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";

function ForgotPassword() {
  return (
    <>
      <main className="forgot-password-background">
        <div className="shadow-container px-5 py-5 ">
          <Link to="/auth" className="back-arrow">
            <span>Back</span>
          </Link>
          <div className="main-content text-center">
            <div className="forgot-title">Don’t worry, we got your back!</div>
          </div>
          <div className="d-flex justify-content-center email-forgot">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email adress"
            />
          </div>
          <div className="d-flex justify-content-center send-link">
            <Link to="/">
              <button className="btn-login-page mt-5">Send Link</button>
            </Link>
          </div>
          <div className="resend-link text-center">
            You will receive a link to reset your password. <br />
            If you haven’t received any link, click&nbsp;
            <span>
              <Link to="/" className="resend-link-url">
                Resend Link
              </Link>
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ForgotPassword;
