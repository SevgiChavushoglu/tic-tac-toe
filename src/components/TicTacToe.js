import styles from "./tictactoe.css";
import { useState } from "react";
export function TicTacToe() {
  const [cells, selCells] = useState({});
  const [turn, setTurn] = useState("X");

  function handleClick(num) {
    if (turn === "X") {
      setTurn("O");
    } else {
      setTurn("X");
    }
    selCells({ ...cells, [num]: turn });
    console.log("Clicked!", num);
    console.log("Cells:", cells);
  }
  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  return (
    <>
      {turn}'s turn
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
    </>
  );
}
