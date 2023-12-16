import { faEdit, faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import CreateNoteToast from "./CreateNoteToast";
import { Button, ButtonGroup, Card, Table } from "react-bootstrap";
import axios from "axios";

export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/notes")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ notes: data });
      });
  }

  deleteNote = (noteId) => {
    axios
      .delete(`http://localhost:8080/notes/delete-note/${noteId}`)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 6000);
          this.setState({
            notes: this.state.notes.filter((note) => note.id !== noteId),
          });
        } else {
          this.setState({ show: false });
        }
      });
  };

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <CreateNoteToast
            children={{
              show: this.state.show,
              message: "Note Deleted Successfully.",
              type: "danger"
            }}
          />
        </div>
        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> Your Notes
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Text</th>
                  <th>Date</th>
                  <th>Ations</th>
                </tr>
              </thead>
              <tbody>
                {this.state.notes.length === 0 ? (
                  <tr align="center">
                    <td colSpan={6}>Notes Avalible.</td>
                  </tr>
                ) : (
                  this.state.notes.map((notes) => (
                    <tr key={notes.id}>
                      <td>{notes.name}</td>
                      <td>{notes.text}</td>
                      <td>{notes.date}</td>
                      <td>
                        <ButtonGroup>
                          <Button size="sm" variant="outline-primary">
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>{" "}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={this.deleteNote.bind(this, notes.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>{" "}
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
