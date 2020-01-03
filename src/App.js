import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from "react-redux";
import store from './redux/store';

import { Container, Row, Col } from "react-bootstrap";

import Landing from "./components/Landing";
import CreateOrJoinGameRoom from "./components/CreateOrJoinGameRoom";
import StartNewGame from './components/StartNewGame';
import PlayGame from "./components/PlayGame";


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Router>
            <Container>
              <Row>
                <Col>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/create-game-room" component={CreateOrJoinGameRoom} />
                  <Route exact path="/start-new-game" component={StartNewGame} />
                  <Route exact path="/play-game" component={PlayGame} />
                </Col>
              </Row>
            </Container>
          </Router>
        </header>
      </div>
    </Provider>
  );
}


export default App;
