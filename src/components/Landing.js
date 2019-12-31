import React, { useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { Button } from 'react-bootstrap';

import { createPlayer } from "../redux/actions/playerActions";

import PromptDialog from "./PromptDialog";

function Landing(props) {
    const [promptInput, setPromptInput] = useState(false);

    const handleSubmit = async playerName => {
        await props.createPlayer(playerName);
        props.history.push('/create-game-room');
    };

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
        </div>
    );
}

Landing.propTypes = {
    createPlayer: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({
    createPlayer: bindActionCreators(createPlayer, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing));