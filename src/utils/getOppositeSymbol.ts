const getOppositeSymbol = (symbol: "x" | "o") => {
  if (symbol == "x") {
    return "o";
  } else {
    return "x";
  }
};
export default getOppositeSymbol;
