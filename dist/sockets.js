"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
function sockets(server) {
    const io = socket_io_1.default(server);
    io.on("connection", (consocket) => {
        console.log("socket made connection");
        consocket.on("chatconnect", (username) => {
            consocket.broadcast.emit("chatconnect", username);
        });
        consocket.on("message", (data) => {
            io.sockets.emit("message", data);
        });
        consocket.on("typing", (username) => {
            consocket.broadcast.emit("typing", username);
        });
        consocket.on("typingoff", () => {
            consocket.broadcast.emit("typingoff");
        });
        consocket.on("leave", (username) => {
            consocket.broadcast.emit("leave", username);
        });
        consocket.on("disconnect", () => {
            console.log("user disconnect");
        });
    });
}
exports.sockets = sockets;
//# sourceMappingURL=sockets.js.map