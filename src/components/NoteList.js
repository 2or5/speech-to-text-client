import {
  faEdit,
  faFastBackward,
  faFastForward,
  faList,
  faStepBackward,
  faStepForward,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import CreateNoteToast from "./CreateNoteToast";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Card, Table, InputGroup } from "react-bootstrap";
import axios from "axios";

export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      currentPage: 1,
      notesPerPage: 7,
    };
  }

  componentDidMount() {
    this.getAllNotes();
  }

  getAllNotes() {
    fetch("http://localhost:8080/notes")
      .then((response) => response.json())
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

  changePage = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value),
    });
  };

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  lastPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.notes.length / this.state.notesPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.notes.length / this.state.notesPerPage
        ),
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.notes.length / this.state.notesPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  render() {
    const { notes, currentPage, notesPerPage } = this.state;
    const lastIndex = currentPage * notesPerPage;
    const firstIndex = lastIndex - notesPerPage;
    const currentNotes = notes.slice(firstIndex, lastIndex);
    const totalPages = notes.length / notesPerPage;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <CreateNoteToast
            children={{
              show: this.state.show,
              message: "Note Deleted Successfully.",
              type: "danger",
            }}
          />
        </div>
        <Card
          className="border border-dark bg-dark text-white"
          style={{ marginTop: "37px" }}
        >
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
                  currentNotes.map((notes) => (
                    <tr key={notes.id}>
                      <td>{notes.name}</td>
                      <td>{notes.text}</td>
                      <td>{notes.date}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={"/edit/" + notes.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
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
          <Card.Footer>
            <div style={{ float: "left" }}>
              Showing Page {currentPage} of {totalPages}
            </div>
            <div style={{ float: "right" }}>
              <InputGroup>
                <Button
                  type="button"
                  variant="light"
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.firstPage}
                >
                  <FontAwesomeIcon icon={faFastBackward} /> First
                </Button>
                <Button
                  type="button"
                  variant="light"
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.prevPage}
                >
                  <FontAwesomeIcon icon={faStepBackward} /> Prev
                </Button>

                <Button
                  type="button"
                  variant="light"
                  disabled={currentPage === totalPages ? true : false}
                  onClick={this.nextPage}
                >
                  <FontAwesomeIcon icon={faStepForward} /> Next
                </Button>
                <Button
                  type="button"
                  variant="light"
                  disabled={currentPage === totalPages ? true : false}
                  onClick={this.lastPage}
                >
                  <FontAwesomeIcon icon={faFastForward} /> Last
                </Button>
              </InputGroup>
            </div>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
