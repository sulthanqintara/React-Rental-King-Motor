import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

class Profile extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main className="profile-container">
          <p className="profile-title">Profile</p>
          <section className="text-center top-profile">
            <div className="profile-photo profile-display">
              <Link to="#">
                <div className="edit-profile">
                  <div className="edit-icon"></div>
                </div>
              </Link>
            </div>
            <p className="profile-name">Samantha Doe</p>
            <p className="profile-desc">
              samanthadoe@mail.com
              <br />
              +62833467823
              <br />
              Has been active since 2013
            </p>
            <div className="gender">
              <label className="gender-container">
                Male
                <input type="radio" name="radio" />
                <span className="checkmark"></span>
              </label>
              <label className="gender-container">
                Female
                <input type="radio" defaultChecked="checked" name="radio" />
                <span className="checkmark"></span>
              </label>
            </div>
          </section>
          <section className="profile-fields">
            <div className="contacts">
              <p className="profile-fields-title">Contacts</p>
              <label className="profile-fields-subtitle" htmlFor="email">
                Email Address:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="zulaikha17@gmail.com"
              />
              <label className="profile-fields-subtitle" htmlFor="address">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Iskandar Street no. 67 Block A Near Bus Stop"
              />
              <label className="profile-fields-subtitle" htmlFor="mobile-num">
                Mobile Number:
              </label>
              <input
                type="text"
                id="mobile-num"
                name="mobile-num"
                placeholder="(+62)813456782"
              />
            </div>
            <div className="Identity">
              <p className="profile-fields-title">Identity</p>
              <div className="identity-container">
                <div className="flex-grow-1 identity-flex me-md-5">
                  <label className="profile-fields-subtitle" htmlFor="dname">
                    Display name:
                  </label>
                  <input
                    type="text"
                    id="dname"
                    name="dname"
                    placeholder="zulaikha"
                  />
                </div>
                <div className="flex-grow-1 identity-flex ms-md-5">
                  <label className="profile-fields-subtitle" htmlFor="DD/MM/YY">
                    DD/MM/YY
                  </label>
                  <input
                    type="date"
                    id="DD/MM/YY"
                    name="DD/MM/YY"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between edit-profile-button mt-5">
              <div>
                <Link to="/">
                  <button className="btn-save-profile">Save Change</button>
                </Link>
              </div>
              <div>
                <Link to="#">
                  <button className="btn-edit-pass">Edit Password</button>
                </Link>
              </div>
              <div>
                <Link to="/">
                  <button className="btn-cancel">Cancel</button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer></Footer>
      </>
    );
  }
}

export default Profile;
