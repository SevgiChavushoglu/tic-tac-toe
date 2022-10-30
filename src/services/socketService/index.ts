import {Socket, io} from "socket.io-client"
//import {DefaultEventsMap} from "socket.io/component-emitter"
class SocketService{
     socket: Socket | null=null
     connect(url:string){
        return new Promise((resolve, reject)=>{
            this.socket= io(url);
        if (!this.socket)
            return reject();
        this.socket.on("connect", () => {
            resolve(this.socket as Socket)
        });
        this.socket.on("connect_error", (err) => {
            console.log("connection error", err);
            reject(err);
        });
    })
    }
}

export default new SocketService();