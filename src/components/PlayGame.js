import React from "react";
import "../App.css";

import { Button, Container, Row, Col } from "react-bootstrap";

function Square(props) {
    return (
        <Button block={true} variant="outline-light" size="lg" style={{ height: "68px", width: "68px" }}>X</Button>
    );
}

function Board(props) {
    return (
        <Container>
            <Row className="justify-content-md-center no-gutters">
                <Col md="auto"><Square /></Col>
                <Col md="auto"><Square /></Col>
                <Col md="auto"><Square /></Col>
            </Row>
            <Row className="justify-content-md-center no-gutters">
                <Col md="auto"><Square /></Col>
                <Col md="auto"><Square /></Col>
                <Col md="auto"><Square /></Col>
            </Row>
            <Row className="justify-content-md-center no-gutters">
                <Col md="auto"><Square /></Col>
                <Col md="auto"><Square /></Col>
                <Col md="auto"><Square /></Col>
            </Row>
        </Container>
    );
}

function PlayGame(props) {
    return (
        <Board />
    );
}

export default PlayGame;