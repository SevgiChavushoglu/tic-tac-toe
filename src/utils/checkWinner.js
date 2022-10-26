export function checkWinner(cells, turn, setWinner) {
  let checkAgainst = "";
  if (turn === "X") {
    checkAgainst = "O";
  } else {
    checkAgainst = "X";
  }
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
      if (cells[num] === checkAgainst) {
        count += 1;
      }
      return true;
    });
    if (count === 3) {
      setWinner(checkAgainst);
    }
  }
}
