import React, { useState } from "react";
import "../App.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { Button, Container, Row, Col } from "react-bootstrap";

import { makeAMove } from "../redux/actions/playerActions";

function Square(props) {
    const [buttonText, setButtonText] = useState('');

    const onSquareClick = (event) => {
        event.preventDefault();
        if (props.myTurn) {
            setButtonText("CIRCLE" === props.playerSymbol ? 'O' : 'X');
            props.makeAMove({ playerId: props.playerId, gameId: props.gameId, row: props.row, col: props.col })
        }
    };

    return (
        <Button block={true} variant="outline-light" size="lg" style={{ height: "68px", width: "68px" }} onClick={onSquareClick}>{buttonText}</Button>
    );
}

function Board(props) {
    return (
        <Container>
            <Row className="justify-content-md-center no-gutters">
                <Col md="auto"><Square row={0} col={0} myTurn={props.myTurn} playerSymbol={props.playerSymbol} makeAMove={props.makeAMove} playerId={props.playerId} gameId={props.gameId} /></Col>
                <Col md="auto"><Square row={0} col={1} myTurn={props.myTurn} playerSymbol={props.playerSymbol} makeAMove={props.makeAMove} playerId={props.playerId} gameId={props.gameId} /></Col>
                <Col md="auto"><Square row={0} col={2} myTurn={props.myTurn} playerSymbol={props.playerSymbol} makeAMove={props.makeAMove} playerId={props.playerId} gameId={props.gameId} /></Col>
            </Row>
            <Row className="justify-content-md-center no-gutters">
                <Col md="auto"><Square row={1} col={0} myTurn={props.myTurn} playerSymbol={props.playerSymbol} makeAMove={props.makeAMove} playerId={props.playerId} gameId={props.gameId} /></Col>
                <Col md="auto"><Square row={1} col={1} myTurn={props.myTurn} playerSymbol={props.playerSymbol} makeAMove={props.makeAMove} playerId={props.playerId} gameId={props.gameId} /></Col>
                <Col md="auto"><Square row={1} col={2} myTurn={props.myTurn} playerSymbol={props.playerSymbol} makeAMove={props.makeAMove} playerId={props.playerId} gameId={props.gameId} /></Col>
            </Row>
            <Row className="justify-content-md-center no-gutters">
                <Col md="auto"><Square row={2} col={0} myTurn={props.myTurn} playerSymbol={props.playerSymbol} makeAMove={props.makeAMove} playerId={props.playerId} gameId={props.gameId} /></Col>
                <Col md="auto"><Square row={2} col={1} myTurn={props.myTurn} playerSymbol={props.playerSymbol} makeAMove={props.makeAMove} playerId={props.playerId} gameId={props.gameId} /></Col>
                <Col md="auto"><Square row={2} col={2} myTurn={props.myTurn} playerSymbol={props.playerSymbol} makeAMove={props.makeAMove} playerId={props.playerId} gameId={props.gameId} /></Col>
            </Row>
        </Container>
    );
}

function GameBoard(props) {
    return (
        <Board myTurn={props.myTurn} playerSymbol={props.playerSymbol} makeAMove={props.makeAMove} playerId={props.playerId} gameId={props.gameId} />
    );
}

GameBoard.propTypes = {
    playerId: PropTypes.string.isRequired,
    gameRoomId: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    playerSymbol: PropTypes.string.isRequired,
    myTurn: PropTypes.bool.isRequired,
    makeAMove: PropTypes.func
};

const mapStateToProps = state => ({
    playerId: state.player.playerId,
    gameRoomId: state.player.gameRoomId,
    gameId: state.player.gameId,
    playerSymbol: state.player.playerSymbol,
    myTurn: state.player.myTurn
});

const mapDispatchToProps = dispatch => ({
    makeAMove: bindActionCreators(makeAMove, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GameBoard));