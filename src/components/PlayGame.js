import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import { isMyTurn } from "../redux/actions/playerActions";

import GameBoard from './GameBoard';

function PlayGame(props) {
    const [playerTurnNotification, setPlayerTurnNotification] = useState("Wait for Your Turn");
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        clearInterval(intervalId);
        setIntervalId(null);

        if (props.myTurn) {
            setPlayerTurnNotification("Play Your Turn")
        } else if (props.playerId && props.gameId) {
            setPlayerTurnNotification("Wait for Your Turn");
            setIntervalId(setInterval(props.isMyTurn, 1500, { playerId: props.playerId, gameId: props.gameId }));
        }
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
    myTurn: PropTypes.bool.isRequired,
    isMyTurn: PropTypes.func,
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

const mapDispatchToProps = dispatch => ({
    isMyTurn: bindActionCreators(isMyTurn, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayGame));