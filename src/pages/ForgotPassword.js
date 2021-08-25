import React from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";

function ForgotPassword() {
  return (
    <>
      <main className="forgot-password-background">
        <div className="shadow-container px-5 py-5 ">
          <a class="back-arrow" href="/auth">
            <span>Back</span>
          </a>
          <div class="main-content text-center">
            <div class="forgot-title">Don’t worry, we got your back!</div>
          </div>
          <div class="d-flex justify-content-center email-forgot">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email adress"
            />
          </div>
          <div class="d-flex justify-content-center send-link">
            <Link to="/">
              <button class="btn-login-page mt-5">Send Link</button>
            </Link>
          </div>
          <div class="resend-link text-center">
            You will receive a link to reset your password. <br />
            If you haven’t received any link, click&nbsp;
            <span>
              <a class="resend-link-url" href="/">
                Resend Link
              </a>
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ForgotPassword;
