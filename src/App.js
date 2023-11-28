import './App.css';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import {Container, Row, Col } from 'react-bootstrap';
import NoteList from './components/NoteList';
import Note from './components/Note';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Welcome from './components/Welcome';


function App() {
  return (
    <Router>
      <NavigationBar/>
        <Container>
          <Row>
            <Col lg={12}>
               <Routes>
                  <Route path='/' Component={Welcome}/>
                  <Route path='/list' Component={NoteList}/>
                  <Route path='/add' Component={Note}/>
                </Routes>  
            </Col>
          </Row>
        </Container>
      <Footer/>
    </Router>
  );
}

export default App;
