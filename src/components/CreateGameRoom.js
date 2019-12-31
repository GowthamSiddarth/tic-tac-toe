import React, { useState } from "react";

import { Button } from "react-bootstrap";

function CreateGameRoom(props) {
    return (
        <div>
            <Button variant="primary" size="lg">
                Create Room
            </Button>
        </div>
    );
}

export default CreateGameRoom;