import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { Button } from 'react-bootstrap';

import { createPlayer } from "../redux/actions/playerActions";

import PromptDialog from "./dialogs/PromptDialog";
import MessageDialog from "./dialogs/MessageDialog";

function Landing(props) {
    const [promptInput, setPromptInput] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);

    useEffect(() => {
        if (props.player.playerId)
            props.history.push('/create-game-room');
        else if (props.error.errorMessage)
            setShowErrorMsg(true);
    }, [props.error.errorMessage, props.history, props.player.playerId]);

    const handleSubmit = playerName => {
        props.createPlayer(playerName);
        setPromptInput(false);
    }

    return (
        <div>
            <Button variant="primary" size="lg" onClick={() => setPromptInput(true)}>
                Play Game
            </Button>
            <PromptDialog
                show={promptInput}
                title="Enter Your Name"
                placeholder="Player Name"
                onSubmit={handleSubmit}
                onHide={() => setPromptInput(false)}
            />
            <MessageDialog
                show={showErrorMsg}
                title="Failure"
                body={props.error.errorMessage}
                onHide={() => setShowErrorMsg(false)}
            />
        </div>
    );
}

Landing.propTypes = {
    createPlayer: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    player: state.player,
    error: state.error
});

const mapDispatchToProps = dispatch => ({
    createPlayer: bindActionCreators(createPlayer, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing));