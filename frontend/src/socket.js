import { io } from "socket.io-client";

const URL = "http://localhost:5000";

export const socket = io(URL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 10000,
});