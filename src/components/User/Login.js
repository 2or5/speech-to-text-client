import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faRegistered, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { request, setAuthHeader } from '../../api/axiosHelper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.name === 'email' ? event.target.value : email);
    setPassword(event.target.name === 'password' ? event.target.value : password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    request("POST", "/auth/authenticate", {
      email: email,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then((response) => {
      setAuthHeader(response.data.token);
      navigate("/");
      window.location.reload();
    }).catch((error) => {
      setAuthHeader(null);
      console.error("Login failed:", error);
    });
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={5}>
        <Card className={"border border-dark bg-dark text-white"} style={{ marginTop: "37px" }}>
          <Card.Header>
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Card.Header>
          <Form onSubmit={handleSubmit}>
            <Card.Body>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group style={{ marginTop: "15px" }}>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                  />
                </InputGroup>
              </Form.Group>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
            <Link to="/register">
              <Button variant="light">
              <FontAwesomeIcon icon={faRegistered} /> Register
              </Button>
            </Link>{' '}
              <Button type="submit" variant="light" disabled={email.length === 0 || password.length === 0}>
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
