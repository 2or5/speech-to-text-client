import { faEnvelope, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Row, Col, Card, Form, InputGroup, FormControl, Button } from "react-bootstrap";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        email: '',
        password: ''
    };

    credentionalChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    render() {
        const {email, password} = this.state;

        return (
            <Row className="justify-content-md-center">
            <Col xs={5}>
                <Card className={"border border-dark bg-dark text-white"} style={{ marginTop: "37px" }}>
                    <Card.Header>
                       <FontAwesomeIcon icon={faSignInAlt}/> Login
                    </Card.Header>
                    <Card.Body>
                    
                            <Form.Group>
                                <InputGroup>
                                <InputGroup.Text>
                                <FontAwesomeIcon icon={faEnvelope}/>
                                </InputGroup.Text>
                                <FormControl required autoComplete="off" type="text" name="email" value={email} onChange={this.credentionalChange} placeholder="Enter Email Address"/>
                                </InputGroup>
                            </Form.Group>
                       
                            <Form.Group style={{ marginTop: "15px" }}>
                                <InputGroup>
                                <InputGroup.Text>
                                <FontAwesomeIcon icon={faLock}/>
                                </InputGroup.Text>
                                <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={this.credentionalChange} placeholder="Enter Password"/>
                                </InputGroup>
                            </Form.Group>
                        
                    </Card.Body>
                    <Card.Footer style={{textAlign:"right"}}>
                        <Button type="button" vocab="success" variant="light"
                        disabled={this.state.email.length === 0 || this.state.password.length === 0}>
                            <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
            </Row>
        );
    }
}

export default Login;