import './App.css';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import {Container, Row, Jumbotron, Col } from 'react-bootstrap';
import NoteList from './components/NoteList';
import Note from './components/Note';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Welcome from './components/Welcome';


function App() {
  return (
    <Router>
      <NavigationBar/>
        <Container>
          <Row>
            <Col lg={12}>
                  <Welcome/>
            </Col>
          </Row>
        </Container>
        <NoteList/>
        <Note/>
        <Footer/>
    </Router>
  );
}

export default App;
