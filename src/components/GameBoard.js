import React, { useState, useEffect } from "react";
import "../App.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { Button, Container, Row, Col } from "react-bootstrap";

import { makeAMove } from "../redux/actions/playerActions";

function Square(props) {
    const [buttonText, setButtonText] = useState('');

    useEffect(() => {
        setButtonText("CIRCLE" === props.grid[props.row][props.col] ? 'O' : 'CROSS' === props.grid[props.row][props.col] ? 'X' : '');
    }, [props.grid, props.row, props.col]);

    const onSquareClick = (event) => {
        event.preventDefault();
        if (props.myTurn && 0 === buttonText.length) {
            setButtonText("CIRCLE" === props.playerSymbol ? 'O' : 'X');
            props.makeAMove({ playerId: props.playerId, gameRoomId: props.gameRoomId, gameId: props.gameId, row: props.row, col: props.col })
        }
    };

    return (
        <Button variant="outline-light" size="lg" style={{ height: "68px", width: "68px" }} onClick={onSquareClick}>{buttonText}</Button>
    );
}

function Board(props) {
    return (
        <Container>
            {
                Array(3).fill('').map((_rowVal, rowIdx) =>
                    <Row className="justify-content-md-center no-gutters">
                        {
                            Array(3).fill('').map((_colVal, colIdx) =>
                                <Col md="auto">
                                    <Square
                                        row={rowIdx}
                                        col={colIdx}
                                        myTurn={props.myTurn}
                                        playerSymbol={props.playerSymbol}
                                        makeAMove={props.makeAMove}
                                        playerId={props.playerId}
                                        gameRoomId={props.gameRoomId}
                                        gameId={props.gameId}
                                        lastMoveSymbol={props.lastMoveSymbol}
                                        lastMoveRow={props.lastMoveRow}
                                        lastMoveCol={props.lastMoveCol}
                                        grid={props.grid} />
                                </Col>
                            )
                        }
                    </Row>
                )
            }
        </Container>
    );
}

function GameBoard(props) {
    return (
        <Board
            myTurn={props.myTurn}
            playerSymbol={props.playerSymbol}
            makeAMove={props.makeAMove}
            playerId={props.playerId}
            gameRoomId={props.gameRoomId}
            gameId={props.gameId}
            lastMoveSymbol={props.lastMoveSymbol}
            lastMoveRow={props.lastMoveRow}
            lastMoveCol={props.lastMoveCol}
            grid={props.grid} />
    );
}

GameBoard.propTypes = {
    playerId: PropTypes.string.isRequired,
    gameRoomId: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    playerSymbol: PropTypes.string.isRequired,
    myTurn: PropTypes.bool.isRequired,
    lastMoveSymbol: PropTypes.string,
    lastMoveRow: PropTypes.number,
    lastMoveCol: PropTypes.number,
    makeAMove: PropTypes.func,
    grid: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    playerId: state.player.playerId,
    gameRoomId: state.player.gameRoomId,
    gameId: state.player.gameId,
    playerSymbol: state.player.playerSymbol,
    myTurn: state.player.myTurn,
    lastMoveSymbol: state.player.lastMoveSymbol,
    lastMoveRow: state.player.lastMoveRow,
    lastMoveCol: state.player.lastMoveCol,
    grid: state.player.grid
});

const mapDispatchToProps = dispatch => ({
    makeAMove: bindActionCreators(makeAMove, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GameBoard));