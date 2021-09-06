import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Component } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loggedInAction, logoutAction } from "../redux/actionCreators/auth";

class Header extends Component {
  state = {
    isLogoutButtonClicked: false,
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.signedIn();
    }
  }
  signOutHandler = () => {
    this.props.signOut();
    this.props.history.push("/auth");
  };
  render() {
    const path = this.props.location.pathname;
    return (
      <>
        <header>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              <svg height="3em" width="3em">
                <circle
                  cx="1.5em"
                  cy="1.5em"
                  r="1em"
                  stroke="white"
                  strokeWidth="3"
                  fill="#393939"
                />
                <circle
                  cx="1.5em"
                  cy="1.5em"
                  r=".4em"
                  stroke="white"
                  strokeWidth="3"
                  fill="orange"
                />
              </svg>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                <Link className={path === "/" ? "active" : ""} to="/">
                  Home
                </Link>
                <Link
                  className={path === "/vehicles" ? "active" : ""}
                  to="/vehicles"
                >
                  Vehicle Types
                </Link>
                <Link
                  className={path === "/history" ? "active" : ""}
                  to="/history"
                >
                  History
                </Link>
                <Link to="/">About</Link>
                {this.props.auth.isLogin ? (
                  <div className="mail-btn mx-3">
                    <div className="mail-notif">1</div>
                    <NavDropdown className="mail-dropdown" title="" id="">
                      <NavDropdown.Item
                        onClick={() => {
                          this.props.history.push("/chat");
                        }}
                      >
                        <div className="d-flex justify-content-between pb-2">
                          <div className="fw-bold">User 1</div>
                          <div className="ps-5">Just now</div>
                        </div>
                        <div className="fw-bold">
                          Hey, there are 3 vespa left
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={() => {
                          this.props.history.push("/chat");
                        }}
                      >
                        <div className="d-flex justify-content-between pb-2">
                          <div className="fw-bold">User 2</div>
                          <div className="ps-5">Yesterday</div>
                        </div>
                        <div className="">
                          Okay, thank you for the good service
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={() => {
                          this.props.history.push("/chat");
                        }}
                      >
                        <div className="d-flex justify-content-between pb-2">
                          <div className="fw-bold">User 1</div>
                          <div className="ps-5">Yesterday</div>
                        </div>
                        <div className="fw-bold">
                          Hey, there are 3 vespa left
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={() => {
                          this.props.history.push("/chat");
                        }}
                      >
                        <div className="d-flex justify-content-between pb-2">
                          <div className="fw-bold">User 2</div>
                          <div className="ps-5">Yesterday</div>
                        </div>
                        <div className="">
                          Okay, thank you for the good service
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                    </NavDropdown>
                  </div>
                ) : (
                  <Nav.Link
                    onClick={() => {
                      this.props.history.push("/auth");
                    }}
                  >
                    <button title="login" className="btn-login ">
                      Login
                    </button>
                  </Nav.Link>
                )}
                {this.props.auth.isLogin ? (
                  <NavDropdown
                    className="profile-icon profile-photo"
                    style={{
                      backgroundImage: `url(${this.props.auth.authInfo.profilePic})`,
                    }}
                    title=""
                    id=""
                  >
                    <NavDropdown.Item
                      onClick={() => {
                        this.props.history.push("/profile");
                      }}
                    >
                      <div className="fw-bold pb-2">Edit Profile</div>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        this.props.history.push("/");
                      }}
                    >
                      <div className="fw-bold pb-2">Help</div>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="">
                      <button
                        className="fw-bold p-0 logout-btn"
                        onClick={() => {
                          this.setState({ isLogoutButtonClicked: true });
                        }}
                      >
                        Logout
                      </button>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </NavDropdown>
                ) : (
                  <Nav.Link
                    onClick={() => {
                      this.props.history.push("/register");
                    }}
                  >
                    <button title="login" className="btn-register ">
                      Register
                    </button>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        {this.state.isLogoutButtonClicked ? (
          <section className="confirm-logout d-flex align-items-center justify-content-center">
            <div className="confirm-logout-box d-flex align-items-center flex-column">
              Are you sure you want to logout?
              <div className="my-3 d-flex justify-content-around w-100">
                <button
                  type="button"
                  onClick={this.signOutHandler}
                  className="btn btn-danger"
                >
                  Logout
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.setState({ isLogoutButtonClicked: false });
                  }}
                  className="btn btn-success"
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
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
    signedIn: () => {
      dispatch(loggedInAction());
    },
    signOut: () => {
      dispatch(logoutAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
