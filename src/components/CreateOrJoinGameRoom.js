import React, { useState } from "react";
import qs from "qs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { Button, Row, Col } from "react-bootstrap";

import { createGameRoom, joinGameRoom } from "../redux/actions/playerActions";

import PromptDialog from "./PromptDialog";

function CreateOrJoinGameRoom(props) {

    const [promptInput, setPromptInput] = useState(false);

    const createGameRoom = async () => {
        await props.createGameRoom(qs.stringify({ playerId: props.player.playerId }));
        props.history.push('/start-new-game');
    }

    const joinGameRoom = async (gameRoomId) => {
        const respBody = await props.joinGameRoom(qs.stringify({ gameRoomId: gameRoomId, playerId: props.player.playerId }));
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
                    <Button variant="success" size="lg" onClick={() => setPromptInput(true)}>
                        Join Room
                    </Button>
                    <PromptDialog
                        show={promptInput}
                        title="Enter Room ID"
                        placeholder="Room ID"
                        onSubmit={joinGameRoom}
                        onHide={() => setPromptInput(false)}
                    />
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