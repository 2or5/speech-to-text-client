import { faRegistered, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuthToken  } from "../api/axiosHelper";

export default function NavigationBar() {

  const isUser = () => {
    const token = getAuthToken();
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); 
        return decodedToken.role === "USER";
      } catch (error) {
        console.error("Error decoding token:", error);
        return false;
      }
    }
    return false;
  };
  
  const isAdmin = () => {
    const token = getAuthToken();
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); 
        return decodedToken.role === "ADMIN";
      } catch (error) {
        console.error("Error decoding token:", error);
        return false;
      }
    }
    return false;
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Link to={""} className="navbar-brand" style={{ marginLeft: "10px"}}>
         Speech To Text
      </Link>

      <Nav className="mr-auto">
        {(isUser() || isAdmin()) && 
        <Link to={"add"} className="nav-link">
          Add Note
        </Link>}
        {isAdmin() && 
        <Link to={"list"} className="nav-link">
          Note List
        </Link>}
        {isAdmin() && <Link to={"users"} className="nav-link">
          User List
        </Link>}
      </Nav> 
      <Nav className="ms-auto">
      {!isUser() && !isAdmin() && 
        <Link to={"register"} className="nav-link"><FontAwesomeIcon icon={faRegistered} /> Register</Link>}
      {!isUser() && !isAdmin() && 
        <Link to={"login"} className="nav-link"> <FontAwesomeIcon icon={faSignIn} /> Login </Link>}
      {(isUser() || isAdmin()) && 
        <Link to={"login"} className="nav-link"> <FontAwesomeIcon icon={faSignIn} /> Logout </Link>}
      </Nav>
    </Navbar>
  );
}