import { useEffect, useState } from "react";
import "./App.css";
import { TicTacToe } from "./components/TicTacToe";
import { Room } from "./components/Room";
import socketService from "./services/socketService";
import io from "socket.io-client";
import AppContext from "./AppContext";

function App() {
  const [isInRoom, setIsInRoom] = useState(false);

  const socket = io.connect("http://localhost:9000");
  const connectSokcket = async () => {
    const socket = await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    connectSokcket();
  }, []);

  const appContextValue = {
    isInRoom,
    setIsInRoom,
  };
  return (
    <AppContext.Provider value={appContextValue}>
      {!isInRoom && <Room />}
      {isInRoom && <TicTacToe />}
    </AppContext.Provider>
  );
}

export default App;

// carry on from 1.25 of the video
