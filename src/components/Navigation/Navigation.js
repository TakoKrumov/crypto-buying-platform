import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, useEffect } from "react";
import "./Navigation.scss";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

const Navigation = () => {
  const [authButtons, setAuthButtons] = useState([]);
  const { isAuthenticated, onLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInButtons = (
      <>
        <Nav.Item
          onClick={() => {
            onLogout();
            navigate("/");
          }}
        >
          <span>Logout</span>
        </Nav.Item>
      </>
    );

    const loggedOutButtons = (
      <>
        <Nav.Item>
          <Link to="/login">Login</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/register">Register</Link>
        </Nav.Item>
      </>
    );

    setAuthButtons(isAuthenticated ? loggedInButtons : loggedOutButtons);
  }, [isAuthenticated, onLogout, navigate]);
  const windowSize = useWindowSize();

  const getExpandValue = () => {
    if (windowSize <= 696) {
      return false;
    }
    if (windowSize <= 768) {
      return "sm";
    }
    if (windowSize <= 992) {
      return "md";
    }
    if (windowSize <= 1200) {
      return "lg";
    }
    if (windowSize <= 1400) {
      return "xl";
    }
    return "xxl";
  };

  const screenSize = getExpandValue();
  return (
    <>
      <Navbar key={screenSize} bg="light" expand={screenSize} className="mb-3">
        <Container fluid>
          <Navbar.Brand>Exchange Crypto</Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${screenSize}`}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${screenSize}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${screenSize}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${screenSize}`}>
                Crypto Exchange
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 cryExch-nav-center">
                <Nav.Item>
                  <Link to="/">Home</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/news">News</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/coins">Coins</Link>
                </Nav.Item>

                {authButtons}
                <NavDropdown
                  title="Portfolio"
                  id={`offcanvasNavbarDropdown-expand-${screenSize}`}
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/userInfo/wallet"
                    className="cryExch-navDropdownItem"
                  >
                    Wallet
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={Link}
                    to="/userInfo/planing"
                    className="cryExch-navDropdownItem"
                  >
                    Planning
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={Link}
                    to="/userInfo/history"
                    className="cryExch-navDropdownItem"
                  >
                    History
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
