import React from "react";
import qs from "qs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { Button } from "react-bootstrap";

import { startNewGame } from "../redux/actions/playerActions";

function StartNewGame(props) {

    const startNewGame = async () => {
        await props.startNewGame(qs.stringify({
            playerId: props.player.playerId,
            gameRoomId: props.player.gameRoomId
        }));
    }

    return (
        <div>
            <Button variant="primary" size="lg" onClick={startNewGame}>
                Start Game
            </Button>
        </div>
    );
}

StartNewGame.propTypes = {
    startNewGame: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({
    startNewGame: bindActionCreators(startNewGame, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StartNewGame));