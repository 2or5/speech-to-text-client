import React, {Component} from "react";
import {Navbar, Col, Container } from "react-bootstrap";

export default class Footer extends Component {
   render() {
    let fullYear = new Date().getFullYear();
    return (
        <Navbar fixed="bottom" bg="dark" variant="dark">
            <Container>
                <Col lg={12} className="text-center text-muted">
                    <div style={{color: "#e0e0e0"}}>{fullYear}-{fullYear+1}, All Rights Reserved</div>
                </Col>
            </Container>
        </Navbar>
    );
   }
}