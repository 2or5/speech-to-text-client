import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlusSquare,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const NoteEdit = () => {
  const { id } = useParams();
  const [name, namechange] = useState("");
  const [text, textchange] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/notes/note/" + id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        namechange(res.name);
        textchange(res.text);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handlesubmit = (e) => {
    e.preventDefault();

    const sendNote = { id, name, text };

    fetch("http://localhost:8080/notes/edit-note", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(sendNote),
    })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Card
      className={"border border-dark bg-dark text-white"}
      style={{ marginTop: "37px" }}
    >
      <Card.Header>
        <FontAwesomeIcon icon={faEdit} /> Edit your notation
      </Card.Header>
      <Form onSubmit={handlesubmit}>
        <Card.Body>
          <Form.Group style={{ textAlign: "center" }}>
            <Form.Label style={{ marginBottom: "10px", display: "block" }}>
              Title Note - {id}{" "}
            </Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              style={{ width: "660px", height: "38px", margin: "auto" }}
              value={name}
              onChange={(e) => namechange(e.target.value)}
            />
            <textarea
              required
              type="text"
              name="text"
              style={{
                width: "660px",
                height: "100px",
                margin: "auto",
                marginTop: "20px",
              }}
              value={text}
              onChange={(e) => textchange(e.target.value)}
            />
          </Form.Group>
        </Card.Body>
        <Card.Footer>
          <Button
            variant="light"
            type="submit"
            style={{
              width: "150px",
              height: "39px",
              marginLeft: "auto",
              display: "block",
            }}
          >
            <FontAwesomeIcon icon={faSave} /> Save
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default NoteEdit;
