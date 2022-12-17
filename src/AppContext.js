import React from "react";

const defaultState = {
  isInRoom: false,
  setIsInRoom: () => {},
};

export default React.createContext(defaultState);
