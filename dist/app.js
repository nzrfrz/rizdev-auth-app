"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// @ts-ignore
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ws_1 = require("ws");
const router_1 = __importDefault(require("./router"));
const _helpers_1 = require("./_helpers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "client")));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.set("strictQuery", false).connect(process.env.MONGODB_URI)
    .then(() => {
    console.log("Database Connected");
})
    .catch((error) => {
    console.log("Can't connect to database: \n", error);
});
app.get("/api", (req, res) => {
    res.status(200).send(`!!! NODEJS TYPESCRIPT AUTH APP BACK END LIVE !!!`);
});
app.use("/api", (0, router_1.default)());
// app.get("*", (req, res) => {  
//     return res.sendFile(path.resolve(__dirname, "client", "index.html"));
// });
app.listen(process.env.PORT, () => {
    console.log(`App Running on: http://localhost:${process.env.PORT}`);
});
const webSocket = new ws_1.WebSocketServer({ port: parseInt(process.env.WEBSOCKET_PORT) });
(0, _helpers_1.setWebSocketServer)(webSocket);
webSocket.on('connection', (ws) => {
    ws.on('error', console.error);
});
//# sourceMappingURL=app.js.map