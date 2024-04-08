import { Server } from "ws";

export let webSocketServer: Server;
export const setWebSocketServer = (server: Server) => {
    webSocketServer = server;
};