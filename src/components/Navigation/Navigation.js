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
import { toast } from 'react-toastify';

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
  const [activeItem, setActiveItem] = useState('');


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
      <Navbar key={screenSize} expand={screenSize} className="mb-3 header">
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
                <Nav.Item
                  className={`navigation-item ${activeItem === 'home' ? 'active-link' : ''}`}
                  onClick={() => setActiveItem('home')}
                >
                  <NavLink to="/">Home</NavLink>
                </Nav.Item>
                <Nav.Item
                  className={`navigation-item ${activeItem === 'news' ? 'active-link' : ''}`}
                  onClick={() => setActiveItem('news')}
                >
                  <NavLink to="/news">News</NavLink>
                </Nav.Item>
                <Nav.Item
                  className={`navigation-item ${activeItem === 'coins' ? 'active-link' : ''}`}
                  onClick={() => setActiveItem('coins')}
                >
                  <NavLink to="/coins">Coins</NavLink>
                </Nav.Item>

                {isAuthenticated ? (
                  <Nav.Item
                    className="navigation-item"
                    onClick={() => {

                      onLogout();
                      toast.success("You have been logged out");
                    }}
                  >
                    Logout
                  </Nav.Item>
                ) : (
                  <>
                    <Nav.Item
                      className={`navigation-item ${activeItem === 'login' ? 'active-link' : ''}`}
                      onClick={() => setActiveItem('login')}
                    >
                      <NavLink to="/login">Login</NavLink>
                    </Nav.Item>
                    <Nav.Item
                      className={`navigation-item ${activeItem === 'register' ? 'active-link' : ''}`}
                      onClick={() => setActiveItem('register')}
                    >
                      <NavLink to="/register">Register</NavLink>
                    </Nav.Item>
                  </>
                )}
                <NavDropdown
                  className={`navigation-item ${activeItem === 'portfolio' ? 'active-link' : ''}`}
                  onClick={() => setActiveItem('portfolio')}
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
