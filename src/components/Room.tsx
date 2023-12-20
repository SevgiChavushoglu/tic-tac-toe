import { useState } from "react";
import { useContext } from "react";
import React from "react";
import AppContext from "../AppContext";
import gameService from "../services/gameService";
import socketService from "../services/socketService";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

export function Room() {
  const [roomName, setRoomName] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const { setIsInRoom } = useContext(AppContext);

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const socket = socketService.socket;
    if (!roomName || roomName.trim() === "" || !socket) return;
    setIsJoining(true);

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((err) => {
        alert(err);
      });

    setIsJoining(false);
    if (joined) setIsInRoom(true);
  };

  return (
    <Form
      onSubmit={joinRoom}
      className="p-2 d-flex flex-column justify-content-center align-items-center"
    >
      <h4 className="text-info">Enter room name to join the game.</h4>
      <Form.Control
        type="text"
        placeholder="Room name"
        value={roomName}
        size="lg"
        className=" m-2"
        onChange={handleRoomNameChange}
      />
      <Button type="submit" disabled={isJoining} className="m-2" size="lg">
        {isJoining ? "...Joining" : "JOIN"}
      </Button>
    </Form>
  );
}
