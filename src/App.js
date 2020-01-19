import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { Container, Row, Col } from "react-bootstrap";

import Landing from "./components/Landing";
import CreateOrJoinGameRoom from "./components/CreateOrJoinGameRoom";
import StartNewGame from './components/StartNewGame';
import PlayGame from "./components/PlayGame";


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}


export default App;
