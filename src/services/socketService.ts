import type { Socket } from "socket.io-client";

import { io } from "socket.io-client";

const URL: string = import.meta.env.VITE_SOCKET_URL as string || "http://localhost:5000";
export const socket: Socket = io(URL, { transports: ["websocket"] });