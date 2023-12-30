import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFastBackward,
  faFastForward,
  faStepBackward,
  faStepForward,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Card, InputGroup, Table } from "react-bootstrap";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      usersPerPage: 10,
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers() {
    fetch("http://localhost:8080/user/users")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data });
      });
  }

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
      Math.ceil(this.state.users.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.users.length / this.state.usersPerPage
        ),
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.users.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  render() {
    const { users, currentPage, usersPerPage } = this.state;
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = users.slice(firstIndex, lastIndex);
    const totalPages = users.length / usersPerPage;

    return (
      <div>
        <Card
          className="border border-dark bg-dark text-white"
          style={{ marginTop: "37px" }}
        >
          <Card.Header>
            <FontAwesomeIcon icon={faUsers} /> All Users
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <td>Nick name</td>
                  <td>E-mail</td>
                  <td>Role</td>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6"> No Users Avalible</td>
                  </tr>
                ) : (
                  currentUsers.map((users) => (
                    <tr key={users.id}>
                      <td>{users.nickName}</td>
                      <td>{users.email}</td>
                      <td>{users.role}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <div style={{ float: "left" }}>
              Showing Page {currentPage} of {Math.ceil(totalPages)}
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
