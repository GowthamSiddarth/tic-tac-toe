import React, { useState, useEffect } from "react";
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
    const [showErrorMsg, setShowErrorMsg] = useState(false);

    useEffect(() => {
        console.log(props.gameRoomId);
        if (props.gameRoomId) setShowRoomId(true);
        else if (props.errorMessage) setShowErrorMsg(true);
    }, [props.errorMessage, props.history, props.gameRoomId]);

    const createGameRoom = gameRoomName => {
        props.createGameRoom(qs.stringify({ playerId: props.playerId, gameRoomName: gameRoomName }));
        setPromptRoomName(false);
    }

    const joinGameRoom = gameRoomId => {
        props.joinGameRoom(qs.stringify({ gameRoomId, playerId: props.playerId }))
            .then(_resp => props.history.push('/start-new-game'))
            .catch(err => console.log(err.message));
        setPromptRoomId(false);
    }

    const dialogOnHide = (setShowDialog, pathToRedirect) => {
        setShowDialog(false);
        if (pathToRedirect) props.history.push(pathToRedirect);
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
                        body={"Share the room ID with your friend: " + props.gameRoomId}
                        onHide={() => dialogOnHide(setShowRoomId, '/start-new-game')}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <MessageDialog
                        show={showErrorMsg}
                        title="Failure"
                        body={props.errorMessage}
                        onHide={() => dialogOnHide(setShowErrorMsg, null)}
                    />
                </Col>
            </Row>
        </div>
    );
}

CreateOrJoinGameRoom.propTypes = {
    createGameRoom: PropTypes.func.isRequired,
    joinGameRoom: PropTypes.func.isRequired,
    playerId: PropTypes.string.isRequired,
    gameRoomId: PropTypes.string,
    errorMessage: PropTypes.string
};

const mapStateToProps = state => ({
    playerId: state.player.playerId,
    gameRoomId: state.player.gameRoomId,
    errorMessage: state.error.errorMessage
});

const mapDispatchToProps = dispatch => ({
    createGameRoom: bindActionCreators(createGameRoom, dispatch),
    joinGameRoom: bindActionCreators(joinGameRoom, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateOrJoinGameRoom));