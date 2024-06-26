import React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TopMenu.css'; // Import the custom CSS file

export default function TopMenu(props) {
  return (
    <Navbar bg="white" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto"> {/* Align items to the right */}
          <Nav.Link onClick={props.handleClick} className="nav-link">Add Teacher</Nav.Link>
          {/* <Nav.Link onClick={()=>{props.changeSchoolConfig([8, 14, 30, 11,30, 30])}} className="nav-link">School Config</Nav.Link> */}
          <Nav.Link onClick={props.cancelSchoolConfigBox} className="nav-link">School Config</Nav.Link>
          <Nav.Link onClick={props.cancelSubjectConstraintBox} className="nav-link">Subject Constraint</Nav.Link>
          <Nav.Link onClick={() => props.changeClass("1st Grade")} className="nav-link">Current Class:<b> {props.currentClass}</b></Nav.Link>
          <NavDropdown title="Select a Class" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => props.changeClass("Nursery")}>1st Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("KG First")}>2nd Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("KG Second")}>3rd Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("1st Grade")}>1st Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("2nd Grade")}>2nd Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("3rd Grade")}>3rd Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("4th Grade")}>4th Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("5th Grade")}>5th Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("6th Grade")}>6th Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("7th Grade")}>7th Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("8th Grade")}>8th Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("9th Grade")}>9th Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("10th Grade")}>10th Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("11th Grade")}>11th Grade</NavDropdown.Item>
            <NavDropdown.Item onClick={() => props.changeClass("12th Grade")}>12th Grade</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Something else here</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
