import React from "react";

import { Button, Modal } from 'react-bootstrap';

function MessageDialog(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title ? props.title : "Info"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.body ? props.body : "Message written over here"}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Okay</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MessageDialog;