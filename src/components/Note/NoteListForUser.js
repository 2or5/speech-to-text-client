import {faEdit, faList, faTrash } from "@fortawesome/free-solid-svg-icons";
  import { format } from 'date-fns';
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React, { Component } from "react";
  import CreateNoteToast from "./CreateNoteToast";
  import { Link } from "react-router-dom";
  import { request, setAuthHeader  } from "../../api/axiosHelper";
  import { Button, ButtonGroup, Card, Table } from "react-bootstrap";
  import axios from "axios";
  import { getAuthToken  } from '../../api/axiosHelper';
  
  export default class NoteList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        notes: [],
        currentPage: 1,
        notesPerPage: 10,
      };
    }
  
    componentDidMount() {
      this.getAllNotes();
    }
  
    getAllNotes() {
        const userEmail = () => {
          const token = getAuthToken();
          if (token) {
            try {
              const decodedToken = JSON.parse(atob(token.split(".")[1])); 
              return decodedToken.sub;
            } catch (error) {
              console.error("Error decoding token:", error);
              return null;
            }
          }
          return null;
        };
      
        const email = {
          email: userEmail()
        };
      
        request("GET", `/notes/notes-for-user?email=${email.email}`)
          .then((response) => {
            this.setState({ notes: response.data });
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
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
                        <td>{format(new Date (notes.date), 'yyyy-MM-dd HH:mm')}</td>
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
          </Card>
        </div>
      );
    }
  }
  