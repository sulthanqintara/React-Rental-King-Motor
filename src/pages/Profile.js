import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { profileAction } from "../redux/actionCreators/profile";
import Swal from "sweetalert2";

import Header from "../components/Header";
import Footer from "../components/Footer";
// import { patchProfile } from "../utils/https/Profile";

class Profile extends React.Component {
  state = {
    email: "",
    password: "",
    gender: 0,
    address: "",
    phone: "",
    userName: "",
    dob: new Date(this.props.auth.authInfo?.dob).toLocaleDateString("en-CA"),
    files: "",
  };
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  handleClick = (e) => {
    this.setState({ files: this.myRef.current.click() });
  };
  updateProfileHandler = () => {
    const form = new FormData();
    form.append("email", this.state.email || this.props.auth.authInfo.email);
    this.state.files !== "" && form.append("profile_picture", this.state.files);
    form.append("gender", this.state.gender || this.props.auth.authInfo.email);
    form.append(
      "address",
      this.state.address || this.props.auth.authInfo.address
    );
    form.append(
      "phone_number",
      this.state.phone || this.props.auth.authInfo.phone
    );
    form.append(
      "name",
      this.state.userName || this.props.auth.authInfo.userName
    );
    form.append("DOB", this.state.dob || this.props.auth.authInfo.email);
    Swal.fire({
      title: "Do you want to save the changes?",
      confirmButtonColor: "#198754",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        this.props.updateProfile(form, this.props.auth.authInfo.user_id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  render() {
    return (
      <>
        <Header />
        <main className="profile-container">
          <p className="profile-title">Profile</p>
          <section className="text-center top-profile">
            <div
              className="profile-photo profile-display"
              style={{
                backgroundImage: `url(${
                  this.props.auth.authInfo.profilePic
                    ? this.props.auth.authInfo.profilePic
                    : "http://localhost:8000/img/profile-icon-png-898.png"
                })`,
              }}
            >
              <button className="edit-profile" onClick={this.handleClick}>
                <label className="edit-icon" />
              </button>
              <input
                className="d-none"
                ref={this.myRef}
                type="file"
                onChange={(value) =>
                  this.setState({ files: value.target.files[0] })
                }
              />
            </div>
            <p className="profile-name">{this.props.auth.authInfo.userName}</p>
            <p className="profile-desc">
              {this.props.auth.authInfo.email}
              <br />
              {this.props.auth.authInfo.phone}
            </p>
            <div className="gender">
              <label className="gender-container">
                Male
                <input
                  type="radio"
                  defaultChecked={
                    this.props.auth.authInfo.gender === 1 ? "checked" : ""
                  }
                  name="radio"
                  onClick={() => {
                    this.setState({ gender: 1 });
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <label className="gender-container">
                Female
                <input
                  type="radio"
                  defaultChecked={
                    this.props.auth.authInfo.gender === 0 ? "checked" : ""
                  }
                  name="radio"
                  onClick={() => {
                    this.setState({ gender: 0 });
                  }}
                />
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
                defaultValue={this.props.auth.authInfo.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <label className="profile-fields-subtitle" htmlFor="address">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={this.props.auth.authInfo.address}
                onChange={(e) => this.setState({ address: e.target.value })}
              />
              <label className="profile-fields-subtitle" htmlFor="mobile-num">
                Mobile Number:
              </label>
              <input
                type="number"
                id="mobile-num"
                name="mobile-num"
                defaultValue={this.props.auth.authInfo.phone}
                onChange={(e) => this.setState({ phone: e.target.value })}
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
                    defaultValue={this.props.auth.authInfo.userName}
                    onChange={(e) =>
                      this.setState({ userName: e.target.value })
                    }
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
                    defaultValue={this.state.dob}
                    onChange={(e) => {
                      this.setState({ dob: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between edit-profile-button mt-5">
              <div>
                <Link to="#">
                  <button
                    className="btn-save-profile"
                    onClick={this.updateProfileHandler}
                  >
                    Save Change
                  </button>
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
    updateProfile: (body, params) => {
      dispatch(profileAction(body, params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
