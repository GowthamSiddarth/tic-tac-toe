import React, { useState, useEffect } from "react";
import qs from "qs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { Button } from "react-bootstrap";

import { startNewGame } from "../redux/actions/playerActions";

import MessageDialog from "../components/dialogs/MessageDialog";

function StartNewGame(props) {

    const [showErrorMsg, setShowErrorMsg] = useState(false);

    useEffect(() => {
        if (props.gameId && props.playerSymbol) props.history.push('/play-game');
        else if (props.errorMessage) setShowErrorMsg(true);
    }, [props.gameId, props.playerSymbol, props.history, props.errorMessage]);

    const startNewGame = () => props.startNewGame(qs.stringify({
        playerId: props.player.playerId,
        gameRoomId: props.player.gameRoomId
    }));


    const dialogOnHide = (setShowDialog, pathToRedirect) => {
        setShowDialog(false);
        if (pathToRedirect) props.history.push(pathToRedirect);
    }

    return (
        <div>
            <Button variant="primary" size="lg" onClick={startNewGame}>
                Start Game
            </Button>
            <MessageDialog
                show={showErrorMsg}
                title="Failure"
                body={props.errorMessage}
                onHide={() => dialogOnHide(setShowErrorMsg, null)}
            />
        </div>
    );
}

StartNewGame.propTypes = {
    startNewGame: PropTypes.func.isRequired,
    playerId: PropTypes.string.isRequired,
    gameRoomId: PropTypes.string.isRequired,
    gameId: PropTypes.string,
    playerSymbol: PropTypes.string,
    errorMessage: PropTypes.string
};

const mapStateToProps = state => ({
    playerId: state.player.playerId,
    gameRoomId: state.player.gameRoomId,
    gameId: state.player.gameId,
    playerSymbol: state.player.playerSymbol,
    errorMessage: state.error.errorMessage
});

const mapDispatchToProps = dispatch => ({
    startNewGame: bindActionCreators(startNewGame, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StartNewGame));