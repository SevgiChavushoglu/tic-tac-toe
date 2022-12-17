import { useState } from "react";
import { useContext } from "react";
import AppContext from "../AppContext";
import gameService from "../services/gameService";
import socketService from "../services/socketService";

export function Room() {
  const [roomName, setRoomName] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const { setIsInRoom, isInRoom } = useContext(AppContext);
  const handleRoomNameChange = (e) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e) => {
    e.preventDefault();
    const socket = socketService.socket;
    if (!roomName || roomName.trim() === "" || !socket) return;
    setIsJoining(true);

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((err) => {
        alert(err);
      });
    if (joined) {
      setIsInRoom(true);
    }
    setIsJoining(false);
  };

  return (
    <form onSubmit={joinRoom}>
      <h1>Enter Room ID to Join the Game</h1>
      <input
        type="text"
        placeholder="room ID"
        value={roomName}
        onChange={handleRoomNameChange}
      />
      <button type="submit" disabled={isJoining}>
        {isJoining ? "...Joining" : "Join"}
      </button>
    </form>
  );
}
