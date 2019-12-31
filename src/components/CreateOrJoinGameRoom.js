import React from "react";
import qs from "qs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { Button, Row, Col } from "react-bootstrap";

import { createGameRoom, joinGameRoom } from "../redux/actions/playerActions";

function CreateOrJoinGameRoom(props) {

    const createGameRoom = async () => {
        await props.createGameRoom(qs.stringify({ playerId: props.player.playerId }));
        props.history.push('/start-new-game');
    }

    const joinGameRoom = async () => {
        const respBody = await props.joinGameRoom(qs.stringify({ gameRoomId: props.player.gameRoomId, playerId: props.player.playerId }));
        console.log(respBody);
    }

    return (
        <div id="create-join-game-room">
            <Row className="py-2">
                <Col>
                    <Button variant="primary" size="lg" onClick={createGameRoom}>
                        Create Room
                    </Button>
                </Col>
            </Row>
            <Row className="py-2">
                <Col>
                    <Button variant="success" size="lg" onClick={joinGameRoom}>
                        Join Room
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

CreateOrJoinGameRoom.propTypes = {
    createGameRoom: PropTypes.func.isRequired,
    joinGameRoom: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({
    createGameRoom: bindActionCreators(createGameRoom, dispatch),
    joinGameRoom: bindActionCreators(joinGameRoom, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateOrJoinGameRoom));