import { useState } from "react";

export function Room() {
  const [roomName, setRoomName] = useState("");
  const handleRoomNameChange = (e) => {
    const value = e.target.value;
    setRoomName(value);
  };
  return (
    <>
      <h1>Enter Room ID to Join the Game</h1>
      <input
        type="text"
        placeholder="room ID"
        value={roomName}
        onChange={handleRoomNameChange}
      />
      <button>Create!</button>
    </>
  );
}
