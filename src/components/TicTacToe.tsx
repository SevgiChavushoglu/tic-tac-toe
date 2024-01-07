import { useContext, useEffect, useState } from "react";
// import { checkWinner } from "../utils/checkWinner";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import AppContext from "../AppContext";
import checkGameState from "../utils/checkGameState";
import gameService from "../services/gameService";
import socketService from "../services/socketService";
import Loader from "./Loader";
import EndOfGameModal from "./EndOfGameModal";
import getOppositeSymbol from "../utils/getOppositeSymbol";

export type IPlayMatrix = Array<Array<string | null>>;
export interface IstartGame {
  start: boolean;
  symbol: "x" | "o";
}
export interface IStartGame {
  start: boolean;
  symbol: "x" | "o";
}

const defaultMatrix: IPlayMatrix = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export function TicTacToe() {
  const [showModal, setShowModal] = useState(false);
  const [endOfGameMessage, setEndOfGameMessage] = useState("");
  const [matrix, setMatrix] = useState<IPlayMatrix>(defaultMatrix);
  const [winState, setWinState] = useState(null);

  const {
    playerSymbol,
    setPlayerSymbol,
    isGameStarted,
    isInRoom,
    setGameStarted,
    isPlayerTurn,
    roomName,
    setPlayerTurn,
  } = useContext(AppContext);

  const updateGameMatrix = (column: number, row: number, symbol: "x" | "o") => {
    console.log("updating matrix");
    const newMatrix = [...matrix];

    if (newMatrix[row][column] === null || newMatrix[row][column] === "null") {
      newMatrix[row][column] = symbol;
      setMatrix(newMatrix);
    }

    if (socketService.socket) {
      gameService.updateGame(socketService.socket, newMatrix);
      const [currentPlayerWon, otherPlayerWon] = checkGameState(
        newMatrix,
        symbol
      );
      if (currentPlayerWon && otherPlayerWon) {
        gameService.gameWin(socketService.socket, "The game is a tie!");
        setEndOfGameMessage("The game is a tie!");
        setWinState("tie");
        setShowModal(true);
      } else if (currentPlayerWon && !otherPlayerWon) {
        gameService.gameWin(socketService.socket, "You lost :(");
        setEndOfGameMessage("You won!");
        setWinState(playerSymbol);
        setShowModal(true);
      }

      setPlayerTurn(false);
    }
  };

  const handleGameUpdate = () => {
    if (socketService.socket) {
      gameService.onGameUpdate(socketService.socket, (newMatrix) => {
        console.log("setting matrix");
        setMatrix(newMatrix);
        setPlayerTurn(true);
        checkGameState(matrix, playerSymbol);
      });
    }
  };

  const handleGameStart = () => {
    if (socketService.socket) {
      gameService.onStartGame(socketService.socket, (options) => {
        console.log(options);
        setShowModal(false);
        setGameStarted(true);
        setPlayerSymbol(options.symbol);
        setMatrix([
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ]);
        if (options.start) {
          setPlayerTurn(true);
        } else {
          setPlayerTurn(false);
        }
      });
    }
  };

  const handleGameWin = () => {
    if (socketService.socket) {
      gameService.onGameWin(socketService.socket, (message) => {
        setPlayerTurn(false);
        setShowModal(true);
        if (message.includes("tie")) {
          setWinState("tie");
        } else {
          setWinState(getOppositeSymbol(playerSymbol));
        }
        setEndOfGameMessage(message);
      });
    }
  };

  const restartGame = () => {
    const socketMessage = {
      ownState: playerSymbol,
      winState: winState,
      roomId: roomName,
    };
    if (socketService.socket) {
      gameService.restartGame(socketService.socket, socketMessage);
    }
    setMatrix([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setShowModal(false);
    //if player won setPlayerTurn(true) else false
  };

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
  }, []);

  return (
    <div className="p-3 d-flex flex-column  justify-content-center align-items-center">
      <EndOfGameModal
        show={showModal}
        message={endOfGameMessage}
        handleRestart={restartGame}
      />
      {!isGameStarted && (
        <h2 className="text-primary ">
          Waiting for other player to join to start the Game!
        </h2>
      )}
      {isGameStarted && !isPlayerTurn && !showModal && (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="text-info fs-3 mb-0">
            Waiting for your opponent to play...
          </p>
          <Loader />
        </div>
      )}
      {isInRoom && (
        <p className="text-success fs-3">You are in room "{roomName}" </p>
      )}
      {isGameStarted && isPlayerTurn && (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="text-info fs-3 mb-5">Your turn </p>
        </div>
      )}
      {matrix.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="d-flex">
            {row.map((column, columnIdx) => {
              return (
                <div
                  onClick={() =>
                    isPlayerTurn &&
                    updateGameMatrix(columnIdx, rowIdx, playerSymbol)
                  }
                  key={columnIdx}
                  className={`d-flex justify-content-center align-items-center border-success border-2 ${
                    columnIdx < 2 && "border-end"
                  } ${columnIdx > 0 && "border-start"} ${
                    rowIdx < 2 && "border-bottom"
                  } ${rowIdx > 0 && "border-top"}`}
                  style={{ width: "13em", height: "9em" }}
                >
                  {column && column !== "null" ? (
                    column === "x" ? (
                      <h1 className="text-success ">X</h1>
                    ) : (
                      <h1 className="text-info ">O</h1>
                    )
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
