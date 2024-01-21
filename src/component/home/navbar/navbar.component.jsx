import { Container, Nav, NavDropdown, Navbar, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaMicrochip, FaMobile } from "react-icons/fa"
import { ThemeContext } from "../../../config/theme.context";


const NavbarComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const changeTheme = (e) => {
    e.preventDefault();
    toggleTheme(theme)
  }
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg={theme}
        data-bs-theme={theme}>
        <Container>
          <Navbar.Brand href="#home">Penguins</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">Home</NavLink>
              <Nav.Link href="#link">shop</Nav.Link>
              <NavDropdown title="Category" id="basic-nav-dropdown">
                <NavLink to="/category/electronics" className={"nav-link"}><FaMicrochip />Electronics</NavLink>
                <NavLink to="/category/smartphones" className={"nav-link"}><FaMobile />Smartphones</NavLink>
              </NavDropdown>
            </Nav>
            <Nav>
              <Form>
                <Form.Control type="Search" size="sm" placeholder="search..">

                </Form.Control>
              </Form>
            </Nav>
            <Nav className="float-end">
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/register" className={"nav-link"}>SignUp</NavLink>
              <Nav.Link onClick={changeTheme}><i className="fa-solid fa-circle-half-stroke"></i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;