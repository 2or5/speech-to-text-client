import React from "react";
import { Navbar, Nav } from "react-bootstrap";

class NavigationBar extends React.Component{
    render() {
        return (
            <Navbar bg = "dark" variant="dark">
                <Navbar.Brand href="/">
                    <img src="https://thumbs.dreamstime.com/z/comment-message-icon-application-perfect-logo-website-presentation-more-product-design-solid-style-192854940.jpg" width="25" height="25" alt="brand"/>Speech To Text
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#">Add Note</Nav.Link>
                        <Nav.Link href="#">Note List</Nav.Link>
                    </Nav>

            </Navbar>
        )
    }

}

export default NavigationBar;