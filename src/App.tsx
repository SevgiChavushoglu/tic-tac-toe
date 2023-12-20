import { useEffect, useState } from "react";
import { Room } from "./components/Room";
import socketService from "./services/socketService";
import AppContext, { IGameContextProps } from "./AppContext";
import { TicTacToe } from "./components/TicTacToe";

function App() {
  const [isInRoom, setIsInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<"x" | "o">("x");
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  // creating socket instance
  const connectSokcket = async () => {
    const socket = await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("error", err);
      });
  };

  // connecting to the socket initially (should only be done once)
  useEffect(() => {
    connectSokcket();
  }, []);

  const appContextValue: IGameContextProps = {
    isInRoom,
    setIsInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  };
  return (
    <AppContext.Provider value={appContextValue}>
      <div className="d-flex flex-column justify-content-center align-items-center p-5">
        <h1 className="text-secondary fw-bold">TIC TAC TOE</h1>
        {!isInRoom ? <Room /> : null}
        {isInRoom && <TicTacToe />}
      </div>
    </AppContext.Provider>
  );
}

export default App;

// carry on from 1.25 of the video
