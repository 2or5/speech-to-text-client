import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavigationBar extends React.Component{
    render() {
        return (
            <Navbar bg = "dark" variant="dark">
                <Link to={""} className="navbar-brand">
                <img src="https://thumbs.dreamstime.com/z/comment-message-icon-application-perfect-logo-website-presentation-more-product-design-solid-style-192854940.jpg" width="25" height="25" alt="brand"/>Speech To Text
        
                </Link>
                    <Nav className="mr-auto">
                        <Link to={"add"} className="nav-link">Add Note</Link>
                        <Link to={"list"} className="nav-link">Note List</Link>
                    </Nav>

            </Navbar>
        )
    }

}

export default NavigationBar;