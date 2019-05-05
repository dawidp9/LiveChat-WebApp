// socket setup
import {Server} from "http";
import socket, {Socket} from "socket.io";

interface IData {
    message: string,
    username: string
}

export function sockets(server: Server) {
    const io = socket(server);
    io.on("connection", (consocket: Socket) => {
        console.log("socket made connection");

        consocket.on("chatconnect", (username: string) => {
            consocket.broadcast.emit("chatconnect", username);
        });

        consocket.on("message", (data: IData) => {
            io.sockets.emit("message", data);
            console.log(data.username + " message: " + data.message);
        });

        consocket.on("typing", (username: string) => {
            consocket.broadcast.emit("typing", username);
        });

        consocket.on("typingoff", () => {
            consocket.broadcast.emit("typingoff");
        });

        consocket.on("leave", (username: string) => {
            consocket.broadcast.emit("leave", username);
        });

        consocket.on("disconnect", () => {

            console.log("user disconnect");
        });
    });
}
