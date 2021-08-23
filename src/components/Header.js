import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Header({ status }) {
  console.log(status);
  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
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
            <Nav className="ms-auto">
              <Nav.Link href="/" className="active">
                Home
              </Nav.Link>
              <Nav.Link href="#link">Vehicle Types</Nav.Link>
              <Nav.Link href="#link">History</Nav.Link>
              <Nav.Link href="#link">About</Nav.Link>
              <Nav.Link className="py-0 px-8" href="/auth">
                <button
                  title={status ? "mail" : "login"}
                  className={status ? "mail-btn" : "btn-login"}
                >
                  <div className={status ? "mail-notif" : "none"}>1</div>
                  {status ? "" : "Login"}
                </button>
              </Nav.Link>
              <Nav.Link
                className="py-0 px-8"
                href={status ? "/profile" : "/auth"}
              >
                <button
                  title={status ? "profile-icon" : "register"}
                  className={
                    status ? "profile-icon profile-photo" : "btn-register"
                  }
                >
                  {status ? "" : "Register"}
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
