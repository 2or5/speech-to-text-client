import "./App.css";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import { Container, Row, Col } from "react-bootstrap";
import NoteList from "./components/NoteList";
import Note from "./components/Note";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import NoteEdit from "./components/NoteEdit";

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
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

