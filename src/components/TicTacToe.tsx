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

export type IPlayMatrix = Array<Array<string | null>>;
export interface IstartGame {
  start: boolean;
  symbol: "x" | "o";
}
export interface IStartGame {
  start: boolean;
  symbol: "x" | "o";
}

const PlayStopper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  cursor: default;
`;

export function TicTacToe() {
  const [showModal, setShowModal] = useState(false);
  const [endOfGameMessage, setEndOfGameMessage] = useState("");
  const [matrix, setMatrix] = useState<IPlayMatrix>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const {
    playerSymbol,
    setPlayerSymbol,
    isGameStarted,
    setGameStarted,
    isPlayerTurn,
    setPlayerTurn,
  } = useContext(AppContext);

  const updateGameMatrix = (column: number, row: number, symbol: "x" | "o") => {
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
        gameService.gameWin(socketService.socket, "The game is a tie");
        setEndOfGameMessage("The game is a tie!");
        setShowModal(true);
      } else if (currentPlayerWon && !otherPlayerWon) {
        gameService.gameWin(socketService.socket, "You lost :(");
        setEndOfGameMessage("You won!");
        setShowModal(true);
      }

      setPlayerTurn(false);
    }
  };

  const handleGameUpdate = () => {
    if (socketService.socket) {
      gameService.onGameUpdate(socketService.socket, (newMatrix) => {
        setMatrix(newMatrix);
        setPlayerTurn(true);
        checkGameState(matrix, playerSymbol);
      });
    }
  };

  const handleGameStart = () => {
    if (socketService.socket) {
      gameService.onStartGame(socketService.socket, (options) => {
        setGameStarted(true);
        setPlayerSymbol(options.symbol);
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
        setEndOfGameMessage(message);
      });
    }
  };

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
  }, []);

  return (
    <div className="p-3 d-flex flex-column  justify-content-center align-items-center">
      <EndOfGameModal show={showModal} message={endOfGameMessage} />
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
      {isGameStarted && isPlayerTurn && (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="text-info fs-3 mb-5">Your turn </p>
          {/* <Loader /> */}
        </div>
      )}
      {matrix.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="d-flex">
            {row.map((column, columnIdx) => (
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
            ))}
          </div>
        );
      })}
    </div>
    //   <div className="d-flex flex-column justify-content-center align-items-center p-5">
    //     {!winner ? (
    //       <h3 className={turn === "X" ? "text-danger" : "text-info"}>
    //         {turn}'s turn
    //       </h3>
    //     ) : null}

    //     {winner ? <h1 className="text-success">{winner} won!</h1> : null}
    //     <Table className="m-2">
    //       <tbody className="d-flex flex-column">
    //         <tr className="d-flex">
    //           {/* <Cell num={1} />
    //           <Cell num={2} />
    //           <Cell num={3} /> */}
    //         </tr>
    //         <tr className="d-flex">
    //           {/* <Cell num={4} />
    //           <Cell num={5} />
    //           <Cell num={6} /> */}
    //         </tr>
    //         <tr className="d-flex">
    //           {/* <Cell num={7} />
    //           <Cell num={8} />
    //           <Cell num={9} /> */}
    //         </tr>
    //       </tbody>
    //     </Table>
    //     {winner && (
    //       <Button
    //         // onClick={handleRestart}
    //         className="btn-success btn-lg mt-4"
    //       >
    //         Restart
    //       </Button>
    //     )}
    //   </div>
  );
}
