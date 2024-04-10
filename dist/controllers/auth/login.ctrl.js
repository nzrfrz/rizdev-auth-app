"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
require("dotenv/config");
// import WebSocket, { WebSocketServer } from 'ws';
const _helpers_1 = require("../../_helpers");
const models_1 = require("../../models");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { credential, password } = req.body;
        const isUsingUsername = yield (0, _helpers_1.findOneDocument)(models_1.USERS, { username: credential });
        const isUsingEmail = yield (0, _helpers_1.findOneDocument)(models_1.USERS, { email: credential });
        const dataToUse = isUsingUsername === null ? isUsingEmail : isUsingUsername;
        switch (true) {
            case dataToUse === null:
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Username or Email not found", { credential: "Username or Email not found" });
            case dataToUse !== null && (0, _helpers_1.checkPassword)(password, dataToUse.password) === false:
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Wrong password", { password: "Wrong password" });
            default:
                const signedData = {
                    id: dataToUse.toJSON().id,
                    userRole: dataToUse.userRole,
                };
                const accessToken = (0, _helpers_1.accessTokenGenerator)(signedData);
                const refreshToken = (0, _helpers_1.refreshTokenGenerator)(signedData);
                const tokenCookieValue = `${accessToken}${process.env.TOKEN_SEPARATOR}${refreshToken}`;
                (0, _helpers_1.parseCookie)(res, process.env.TOKEN_COOKIE_NAME, tokenCookieValue, true);
                const updatePayload = { refreshToken };
                const updateResults = yield (0, _helpers_1.updateByID)(models_1.USERS, signedData.id, updatePayload);
                const returnedData = {
                    id: updateResults.id,
                    username: updateResults.username,
                    email: updateResults.email,
                    userRole: updateResults.userRole,
                    isActivated: updateResults.isActivated,
                    createdAt: updateResults.createdAt,
                    updatedAt: updateResults.updatedAt,
                    refreshToken: updateResults.refreshToken,
                };
                const loginCredentialCookieValue = `${returnedData === null || returnedData === void 0 ? void 0 : returnedData.id}${process.env.TOKEN_SEPARATOR}${returnedData === null || returnedData === void 0 ? void 0 : returnedData.refreshToken}`;
                (0, _helpers_1.parseCookie)(res, process.env.LOGIN_CREDENTIAL_COOKIE_NAME, loginCredentialCookieValue.toString(), false);
                _helpers_1.pusher.trigger("userAuth", "login-event", {
                    message: returnedData
                });
                /*
                if (webSocketServer) {
                    webSocketServer.clients.forEach((client: any) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(returnedData));
                        }
                    });
                }
                */
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, "Login success", returnedData);
        }
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, _helpers_1.message.errorRequest, JSON.stringify(error));
    }
});
exports.login = login;
//# sourceMappingURL=login.ctrl.js.map