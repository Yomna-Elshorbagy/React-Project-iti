
import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tokeContext } from '../Context/tokenContext';
import { changeTheme } from '../../Store/action/themeAction';
import { useDispatch, useSelector } from 'react-redux';

export default function Navigationbar() {
  const { token, setToken } = useContext(tokeContext);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch token from localStorage when component mounts
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  function logOut() {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  }

  const changeMyTheme = () => {
    dispatch(changeTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="navbar-expand-lg">
        <Container>
          <Navbar.Brand href="/" className="text-success fw-bold fs-4 ">
            Romanza Store
          </Navbar.Brand>
          <Nav className="me-auto ms-auto">
            {token ? (
              <>
                <Nav.Link as={Link} to="home" className="mx-lg-4">
                  Home
                </Nav.Link>
          
                <Nav.Link as={Link} to="product" className="mx-lg-4">
                  Product
                </Nav.Link>
                <Nav.Link as={Link} to="contact" className="mx-lg-4">
                  Contact
                </Nav.Link>
                <Nav.Link as={Link} to="about" className="mx-lg-4">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="profile" className="mx-lg-4 btn btn-info">
                <i class="fa-solid fa-user"></i>
                </Nav.Link>
                <Nav.Link as={Link} to="cart" className="mx-lg-4 btn btn-info">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Nav.Link>
                <Button className="btn btn-info" onClick={() => changeMyTheme()}>
                  {theme === 'light' ? <i class="fa-regular fa-lightbulb"></i>  : <i class="fa-solid fa-lightbulb"></i>}
                </Button>
                <Button variant="danger" onClick={logOut}>
                  LogOut
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="about" className="mx-lg-4">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="login" className="mx-lg-4">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="register" className="mx-lg-4">
                  Register
                </Nav.Link>
                <Button className="btn btn-info" onClick={() => changeMyTheme()}>
                  {theme === 'light' ?<i class="fa-regular fa-lightbulb"></i> : <i class="fa-solid fa-lightbulb"></i>}
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
