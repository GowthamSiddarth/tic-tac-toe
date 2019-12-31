import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from "react-redux";
import store from './redux/store';

import { Container, Row, Col } from "react-bootstrap";

import Landing from "./components/Landing";
import CreateGameRoom from "./components/CreateGameRoom";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
          <Router>
            <Container>
              <Row>
                <Col>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/create-game-room" component={CreateGameRoom} />
                </Col>
              </Row>
            </Container>
          </Router>
        </Provider>
      </header>
    </div>
  );
}


export default App;
