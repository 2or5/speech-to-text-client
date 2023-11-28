import './App.css';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';

import {Container, Row, Jumbotron, Col } from 'react-bootstrap';

import { Navbar, Nav } from "react-bootstrap";
import NoteList from './components/NoteList';
import Note from './components/Note';


function App() {
  return (
    <div className="App">
      <NavigationBar/>
        {/* <Container>
          <Row>
            <Col lg={12} style={marginTop}>
              <Jumbotron>
                <h1>Hello</h1>
                <p>This is simple </p>
              </Jumbotron>
            </Col>
          </Row>
        </Container> */}
        <NoteList/>
        <Note/>
        <Footer/>
    </div>
  );
}

export default App;
