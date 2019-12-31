import React, { useState } from "react";

import { Button, Modal, FormControl } from 'react-bootstrap';

function PromptDialog(props) {

    const [inputValue, setinputValue] = useState("");

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title ? props.title : "Enter your Input"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    placeholder={props.placeholder ? props.placeholder : "Start Typing..."}
                    aria-label="inputValue"
                    value={inputValue}
                    onChange={e => setinputValue(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={() => props.onSubmit(inputValue)}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PromptDialog;