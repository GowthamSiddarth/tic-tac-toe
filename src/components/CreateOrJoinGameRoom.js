import React from "react";
import qs from "qs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { Button } from "react-bootstrap";

import { createGameRoom } from "../redux/actions/playerActions";

function CreateOrJoinGameRoom(props) {

    const createGameRoom = async () => {
        await props.createGameRoom(qs.stringify({ playerId: props.player.playerId }));
        props.history.push('/start-new-game');
    }

    return (
        <div>
            <Button variant="primary" size="lg" onClick={createGameRoom}>
                Create Room
            </Button>
        </div>
    );
}

CreateOrJoinGameRoom.propTypes = {
    createGameRoom: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({
    createGameRoom: bindActionCreators(createGameRoom, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateOrJoinGameRoom));