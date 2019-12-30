import React from 'react';
import './App.css';

import { Container, Row, Col, Button } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <Col>
              <Button variant="primary" size="lg">
                Play Game
              </Button>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}


export default App;
