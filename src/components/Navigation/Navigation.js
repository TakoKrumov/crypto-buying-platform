import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
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
import { useTheme } from "../../contexts/themeContext";

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
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, onLogout } = useContext(AuthContext);

  const renderThemeIcon = () => {
    return theme === 'light-theme' ? (
      <ion-icon name="sunny-outline"></ion-icon>
    ) : (
      <ion-icon name="moon-outline"></ion-icon>
    );
  };

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
      <Navbar key={screenSize} expand={screenSize} className="mb-3">
        <Container fluid>
          <Navbar.Brand className="website-name">Exchange Crypto</Navbar.Brand>
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
                <Nav.Item className="navigation-item">
                  <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
                </Nav.Item>
                <Nav.Item className="navigation-item">
                  <NavLink to="/news" activeClassName="active-link">News</NavLink>
                </Nav.Item>
                <Nav.Item className="navigation-item">
                  <NavLink to="/coins" activeClassName="active-link">Coins</NavLink>
                </Nav.Item>
                {isAuthenticated ? (
                  <Nav.Item
                    className="navigation-item"
                    onClick={() => {
                      onLogout();
                    }}
                  >
                    <Link to="/">Logout</Link>
                  </Nav.Item>
                ) : (
                  <>
                    <Nav.Item className="btnLogin-popup navigation-item">
                      <NavLink to="/login" activeClassName="active-link">Login</NavLink>
                    </Nav.Item>
                    <Nav.Item className="navigation-item">
                      <NavLink to="/register" activeClassName="active-link">Register</NavLink>
                    </Nav.Item>
                  </>
                )}
                <NavDropdown className="navigation-item"

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
              <button className="btnTheme" onClick={toggleTheme}>{renderThemeIcon()}</button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
