import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const dtuser = sessionStorage.getItem("user");
    const user = JSON.parse(dtuser);
    console.log(user);
    setUser(user);
  }, []);
  const handleOnLogOut = () => {
    sessionStorage.removeItem("user");
  };
  return (
    <Navbar bg="primary" expand="md" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <div className="nav-link fw-bolder text-warning">
                  Welcome back {user?.name}
                </div>
                <Link to="/" className="nav-Link" onClick={handleOnLogOut}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
