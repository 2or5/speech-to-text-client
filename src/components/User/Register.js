import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { request, setAuthHeader } from '../../api/axiosHelper';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.name === 'email' ? event.target.value : email);
    setPassword(event.target.name === 'password' ? event.target.value : password);
    setNickName(event.target.name === 'nickName' ? event.target.value : nickName)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    request("POST", "/auth/register", {
      email: email,
      password: password,
      nickName: nickName
    }, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then((response) => {
      setAuthHeader(response.data.token);
      navigate("/");
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
            <FontAwesomeIcon icon={faUserPlus} /> Register
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
                    type="email"
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
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="nickName"
                    value={nickName}
                    onChange={handleChange}
                    placeholder="Enter Your Nickname"
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
              <Button type="submit" variant="light" disabled={email.length === 0 || password.length === 0 || nickName.length === 0}>
                <FontAwesomeIcon icon={faSignInAlt} /> Register
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
