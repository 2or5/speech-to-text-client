import React, {Component} from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg = "dark" variant="dark">

                <Link to={""} className="navbar-brand">
                <img src="https://c0.klipartz.com/pngpicture/352/130/gratis-png-mercedes-benz-car-servicio-de-vehiculo-motorizado-vehiculo-de-lujo-mercedes-logo.png" width="25" height="25" alt="brand"/>Speech To Text
                </Link>

                <Nav className="mr-auto">
                    <Link to={"add"} className="nav-link">Add Note</Link>
                    <Link to={"list"} className="nav-link">Note List</Link>
                </Nav>

            </Navbar>
        )
    }

}
