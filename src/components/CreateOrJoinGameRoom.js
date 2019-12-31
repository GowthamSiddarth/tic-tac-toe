import React, { useState } from "react";
import qs from "qs";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { Button, Row, Col } from "react-bootstrap";

import { createGameRoom, joinGameRoom } from "../redux/actions/playerActions";

import PromptDialog from "./dialogs/PromptDialog";
import MessageDialog from "./dialogs/MessageDialog";

function CreateOrJoinGameRoom(props) {

    const [promptRoomName, setPromptRoomName] = useState(false);
    const [promptRoomId, setPromptRoomId] = useState(false);
    const [showRoomId, setShowRoomId] = useState(false);
    const [showMsgFromServer, setShowMsgFromServer] = useState(false);

    const createGameRoom = async gameRoomName => {
        await props.createGameRoom(qs.stringify({ playerId: props.player.playerId, gameRoomName: gameRoomName }));
        setPromptRoomName(false);
        props.player.gameRoomId ? setShowRoomId(true) : setShowMsgFromServer(true);
    }

    const joinGameRoom = async (gameRoomId) => {
        const respBody = await props.joinGameRoom(qs.stringify({ gameRoomId: gameRoomId, playerId: props.player.playerId }));
        console.log(respBody);
    }

    return (
        <div id="create-join-game-room">
            <Row className="py-2">
                <Col>
                    <Button variant="primary" size="lg" onClick={() => setPromptRoomName(true)}>
                        Create Room
                    </Button>
                    <PromptDialog
                        show={promptRoomName}
                        title="Enter Room Name"
                        placeholder="Room Name"
                        onSubmit={createGameRoom}
                        onHide={() => setPromptRoomName(false)}
                    />
                </Col>
            </Row>
            <Row className="py-2">
                <Col>
                    <Button variant="success" size="lg" onClick={() => setPromptRoomId(true)}>
                        Join Room
                    </Button>
                    <PromptDialog
                        show={promptRoomId}
                        title="Enter Room ID"
                        placeholder="Room ID"
                        onSubmit={joinGameRoom}
                        onHide={() => setPromptRoomId(false)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <MessageDialog
                        show={showRoomId}
                        title="New Room Created"
                        body={"Share the room ID with your friend: " + props.player.gameRoomId}
                        onHide={() => setShowRoomId(false)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <MessageDialog
                        show={showMsgFromServer}
                        title="Message From Server"
                        body={props.error.msgFromServer}
                        onHide={() => setShowMsgFromServer(false)}
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
    error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    player: state.player,
    error: state.error
});

const mapDispatchToProps = dispatch => ({
    createGameRoom: bindActionCreators(createGameRoom, dispatch),
    joinGameRoom: bindActionCreators(joinGameRoom, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateOrJoinGameRoom));