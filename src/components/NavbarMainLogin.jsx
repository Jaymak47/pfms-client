import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import navlogo from "../components/images/Navlogo.png";
// import Form from "react-bootstrap/Form";
// import Help from "../components/images/help.png";
// import userPic from "../components/images/userphotos/Abduba.jpg";
// import Row from "react-bootstrap/Row";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Container from "react-bootstrap/Container";

const NavBarMainLogin = () => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        style={{ color: "red" }}
        className="navbarstyles"
      >
        <Col>
          <Navbar.Brand></Navbar.Brand>
        </Col>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Col xs={6}>
            <Nav>
              <img src={navlogo} alt="Perfomance Management System" />
            </Nav>
          </Col>
          <Col>
            <Nav></Nav>
          </Col>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBarMainLogin;
