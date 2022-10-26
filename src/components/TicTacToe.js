import styles from "./tictactoe.css";
import { useEffect, useState } from "react";
export function TicTacToe() {
  const [cells, selCells] = useState({});
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(false);
  function isWin(cells, turn) {
    let count = 0;
    const cases = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    for (let item of cases) {
      let count = 0;
      item.map((num) => {
        if (cells[num] === turn) {
          count += 1;
        }
      });
      if (count === 3) {
        alert(`${turn} is the winner!`);
        return true;
      }
    }
  }
  function handleClick(num) {
    if (turn === "X") {
      setTurn("O");
    } else {
      setTurn("X");
    }
    console.log("Clicked!", num);
    selCells({ ...cells, [num]: turn });
    if (isWin(cells, turn)) {
      setWinner(turn);
    }
  }
  console.log(isWin(cells, turn));
  console.log("Cells:", cells);
  console.log("turn:", turn);
  console.log("winner:", winner);
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
