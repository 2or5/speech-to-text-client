import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Link to={""} className="navbar-brand" style={{ marginLeft: "10px"}}>
         Speech To Text
      </Link>

      <Nav className="mr-auto">
        <Link to={"add"} className="nav-link">
          Add Note
        </Link>
        <Link to={"list"} className="nav-link">
          Note List
        </Link>
        <Link to={"users"} className="nav-link">
          User List
        </Link>
      </Nav> 
      <Nav className="ms-auto">
        <Link to={"register"} className="nav-link">Register</Link>
        <Link to={"login"} className="nav-link">Login</Link>
      </Nav>
    </Navbar>
  );
}
