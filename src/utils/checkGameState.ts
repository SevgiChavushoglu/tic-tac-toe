import { IPlayMatrix } from "../components/TicTacToe";

const checkGameState = (matrix: IPlayMatrix, playerSymbol: string) => {
  // checking if there is a row win
  for (let i = 0; i < matrix.length; i++) {
    let row = [];
    for (let j = 0; j < matrix[i].length; j++) {
      row.push(matrix[i][j]);
    }

    if (row.every((value) => value && value === playerSymbol)) {
      return [true, false];
    } else if (row.every((value) => value && value !== playerSymbol)) {
      return [false, true];
    }
  }

  //   checking if there is a column win
  for (let i = 0; i < matrix.length; i++) {
    let column = [];
    for (let j = 0; j < matrix[i].length; j++) {
      column.push(matrix[j][i]);
    }

    if (column.every((value) => value && value === playerSymbol)) {
      return [true, false];
    } else if (column.every((value) => value && value !== playerSymbol)) {
      return [false, true];
    }
  }

  //   checking if there is a diagonal win
  if (matrix[1][1]) {
    if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
      if (matrix[1][1] === playerSymbol) return [true, false];
      else return [false, true];
    }

    if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
      if (matrix[1][1] === playerSymbol) return [true, false];
      else return [false, true];
    }
  }

  //Check for a tie
  if (matrix.every((m) => m.every((v) => v !== null))) {
    return [true, true];
  }

  return [false, false];
};

export default checkGameState;
