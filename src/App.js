import { useEffect } from "react";
import "./App.css";
import { TicTacToe } from "./components/TicTacToe";
import { Room } from "./components/Room";
import socketService from "./services/socketService";
import io from "socket.io-client";

function App() {
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
  return (
    <div className="App">
      <Room />
      <TicTacToe />
    </div>
  );
}

export default App;
