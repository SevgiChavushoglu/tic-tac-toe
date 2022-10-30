import STYLES from "./tictactoe.css";
import { useEffect, useState } from "react";
import { checkWinner } from "../utils/checkWinner";
export function TicTacToe() {
  const [cells, selCells] = useState({});
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  useEffect(() => {
    checkWinner(cells, turn, setWinner);
  }, [cells, turn]);
  
  function handleRestart(winner) {
    if (winner) {
      selCells({});
      setTurn("X");
      setWinner(null);
    }
  }
  function handleClick(num) {
    selCells({ ...cells, [num]: turn });
    if (turn === "X") {
      setTurn("O");
    } else {
      setTurn("X");
    }
  }
  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  return (
    <>
      {turn}'s turn
      {winner ? <p>{winner} won!</p> : null}
      <table>
        <tbody>
          <tr>
            <Cell num={1} />
            <Cell num={2} />
            <Cell num={3} />
          </tr>
          <tr>
            <Cell num={4} />
            <Cell num={5} />
            <Cell num={6} />
          </tr>
          <tr>
            <Cell num={7} />
            <Cell num={8} />
            <Cell num={9} />
          </tr>
        </tbody>
      </table>
      {winner && <button onClick={handleRestart}>Restart</button>}
    </>
  );
}
