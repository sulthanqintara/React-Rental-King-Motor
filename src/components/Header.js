import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Component } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

class Header extends Component {
  isLogout = () => {
    localStorage.setItem("token", "");
    this.props.history.push("/auth");
  };
  render() {
    // const status = this.props.isLogin;
    const token = localStorage.getItem("token");
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
                <Link className="active" to="/">
                  Home
                </Link>
                <Link to="/vehicles">Vehicle Types</Link>
                <Link to="/history">History</Link>
                <Link to="/about">About</Link>
                {token ? (
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
                {token ? (
                  <NavDropdown
                    className="profile-icon profile-photo"
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
                        onClick={this.isLogout}
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
      </>
    );
  }
}

export default withRouter(Header);
