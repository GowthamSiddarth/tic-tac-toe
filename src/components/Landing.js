import React, { useState } from "react";

import { Button, Modal, FormControl } from 'react-bootstrap';

function PlayerNamePrompt(props) {

    const [playerName, setPlayerName] = useState("");

    const onSubmit = () => props.onSubmit(playerName); 

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enter Your Name
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    placeholder="Player Name"
                    aria-label="playerName"
                    value={playerName}
                    onChange={e => setPlayerName(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={onSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Landing() {
    const [modalShow, setModalShow] = useState(false);

    const handleSubmit = playerName => console.log(playerName);

    return (
        <div>
            <Button variant="primary" size="lg" onClick={() => setModalShow(true)}>
                Play Game
            </Button>
            <PlayerNamePrompt
                show={modalShow}
                onSubmit={handleSubmit}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}

export default Landing;