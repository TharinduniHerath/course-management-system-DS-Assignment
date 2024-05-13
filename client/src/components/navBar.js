import React, { useState, useEffect } from 'react'; // Import useEffect
import { Navbar, Nav, Form, FormControl, Button, NavDropdown, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBell, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isLoggedIn, username, handleLogin, handleLogout, role }) {
  const [notifications, setNotifications] = useState([]);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
  };

  useEffect(() => {
    // Set the initial theme based on the saved theme in localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    document.body.className = initialTheme; // Set the body class to the initial theme
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme; // Set the body class to the new theme
    localStorage.setItem('theme', newTheme); // Save the theme to localStorage
  };

  const handleLogoutClick = (event) => {
    event.preventDefault(); // Prevent default behavior of the link
    // Perform logout logic here
    handleLogout(); // Call the handleLogout function passed from props
    setNotifications([]); // Clear notifications
    navigate('/home', { replace: true });
  };

  const handleProfileClick = (event) => {
    event.preventDefault();
    if (role) {
      switch (role) {
        case 'admin':
          navigate('/admindashboard');
          break;
        case 'instructor':
          navigate('/instructordashboard');
          break;
        case 'user':
          navigate('/userdashboard');
          break;
        default:
          // Handle the case where the role doesn't match any of the above
          break;
      }
    }
  };

  return (
    <Navbar
      bg={theme === "light" ? "light" : "dark"}
      expand="lg"
      variant={theme === "light" ? "light" : "dark"}
      className="py-3"
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/home" className="nav-link">
              E-LEARN
            </Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Mathematics
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Science</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">History</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex flex-grow-1">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav>
            {isLoggedIn && (
              <Nav.Link as={Link} to="/notifications">
                <FontAwesomeIcon icon={faBell} />
                {notifications.length > 0 && (
                  <span className="badge">{notifications.length}</span>
                )}
              </Nav.Link>
            )}

            {isLoggedIn && (
              <Nav.Link as={Link} to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Nav.Link>
            )}

            <Button variant="link" onClick={toggleTheme}>
              <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
            </Button>

            {isLoggedIn ? (
              <>
                <Nav.Link onClick={handleProfileClick} href="#profile">
                  {username || "Guest"}
                </Nav.Link>
                <Nav.Link onClick={handleLogoutClick} href="#logout">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
