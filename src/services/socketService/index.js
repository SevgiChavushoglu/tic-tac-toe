import { Socket, io } from "socket.io-client";
//import {DefaultEventsMap} from "socket.io/component-emitter"
class SocketService {
  socket = io();
  connect(url) {
    return new Promise((resolve, reject) => {
      this.socket = io(url);
      if (!this.socket) return reject();
      this.socket.on("connect", () => {
        resolve(this.socket);
      });
      this.socket.on("connect_error", (err) => {
        console.log("connection error", err);
        reject(err);
      });
    });
  }
}

// creates single instance and shows the same instance among all components
export default new SocketService();
