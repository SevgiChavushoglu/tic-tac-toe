import { Socket } from "socket.io-client";
import { IPlayMatrix, IstartGame } from "../../components/TicTacToe";

class GameService {
  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      socket.emit("join_game", { roomId });
      socket.on("room_joined", () => resolve(true));
      socket.on("room_join_error", ({ error }) => reject(error));
    });
  }

  public async updateGame(socket: Socket, gameMatrix: {}) {
    socket.emit("update_game", { matrix: gameMatrix });
  }

  public async onGameUpdate(
    socket: Socket,
    listener: (matrix: IPlayMatrix) => void
  ) {
    socket.on("on_game_update", ({ matrix }) => listener(matrix));
  }

  public async onStartGame(
    socket: Socket,
    listener: (options: IstartGame) => void
  ) {
    socket.on("start_game", listener);
  }

  public async gameWin(socket: Socket, message: string) {
    socket.emit("game_win", { message });
  }

  public async onGameWin(socket: Socket, listener: (message: string) => void) {
    socket.on("on_game_win", ({ message }) => listener(message));
  }

  public async restartGame(socket: Socket, message: {}) {
    socket.emit("restart_game", message);
  }
}

export default new GameService();
