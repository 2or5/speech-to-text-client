import "./App.css";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import { Container, Row, Col } from "react-bootstrap";
import NoteList from "./components/Note/NoteList";
import Note from "./components/Note/Note";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import NoteEdit from "./components/Note/NoteEdit";
import UserList from "./components/User/UserList";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import NoteListForUser from "./components/Note/NoteListForUser";

export default function App() {
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12}>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/add" element={<Note />} />
              <Route path="/edit/:id" element={<NoteEdit />} />
              <Route path="/list" element={<NoteList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/list-user-notes" element={<NoteListForUser />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

