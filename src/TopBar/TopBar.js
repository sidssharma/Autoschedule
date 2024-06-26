import React from "react";
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import autoschedule from './autoschedule.ico';
import './TopBar.css';

export default function TopBar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">AUTOSCHEDULE
      {/* <img src={autoschedule} className="autoscheduleicon"/> */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link onClick={props.handleClick}>About Us</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
