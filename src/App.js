import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col } from "react-bootstrap";

import Landing from "./components/Landing";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Container>
            <Row>
              <Col>
                <Route exact path="/" component={Landing} />
              </Col>
            </Row>
          </Container>
        </Router>
      </header>
    </div>
  );
}


export default App;
