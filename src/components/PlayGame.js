import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import GameBoard from './GameBoard';

function PlayGame(props) {
    const [playerTurnNotification, setPlayerTurnNotification] = useState("Wait for Your Turn");

    useEffect(() => {
        props.myTurn ? setPlayerTurnNotification("Play Your Turn") : setPlayerTurnNotification("Wait for your turn");
    }, [props.myTurn]);

    return (
        <Container>
            <Row>
                <Col>{playerTurnNotification}</Col>
            </Row>
            <Row>
                <Col><GameBoard /></Col>
            </Row>
        </Container>
    );
}

PlayGame.propTypes = {
    playerId: PropTypes.string.isRequired,
    gameRoomId: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    playerSymbol: PropTypes.string.isRequired,
    myTurn: PropTypes.string.isRequired,
    errorMessage: PropTypes.string
};

const mapStateToProps = state => ({
    playerId: state.player.playerId,
    gameRoomId: state.player.gameRoomId,
    gameId: state.player.gameId,
    playerSymbol: state.player.playerSymbol,
    myTurn: state.player.myTurn,
    errorMessage: state.error.errorMessage
});

export default connect(mapStateToProps, null)(withRouter(PlayGame));