import "dotenv/config";

import path from "path";
import cors from "cors";
import express from "express";
// @ts-ignore
import mongoose from "mongoose";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
// import WebSocket, { WebSocketServer } from 'ws';

import router from "./router";
// import { setWebSocketServer } from "./_helpers";

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client")));

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false).connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Database Connected");
})
.catch((error) => {
    console.log("Can't connect to database: \n", error);
});

app.get("/api", (req, res) => {
    res.status(200).send(`!!! NODEJS TYPESCRIPT AUTH APP BACK END LIVE !!!`);
});

app.use("/api", router());

app.get("*", (req, res) => {  
    return res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen(process.env.PORT, () => {
    console.log(`App Running on: http://localhost:${process.env.PORT}`);
});

// const webSocket = new WebSocketServer({ port: parseInt(process.env.WEBSOCKET_PORT) });

// setWebSocketServer(webSocket);

// webSocket.on('connection', (ws: WebSocket) => {
//     ws.on('error', console.error);
// });