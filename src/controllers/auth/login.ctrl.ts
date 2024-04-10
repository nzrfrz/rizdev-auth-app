import "dotenv/config";
import express from "express";
// import WebSocket, { WebSocketServer } from 'ws';

import { 
    status,
    message,
    responseHelper,
    findOneDocument,
    checkPassword,
    parseCookie,
    updateByID,
    accessTokenGenerator,
    refreshTokenGenerator,
    // webSocketServer,
    pusher,
} from "../../_helpers";
import { USERS, UserDocument } from "../../models";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { credential, password } = req.body;
        const isUsingUsername = await findOneDocument<UserDocument>(USERS, { username: credential });
        const isUsingEmail = await findOneDocument<UserDocument>(USERS, { email: credential });
        const dataToUse = isUsingUsername === null ? isUsingEmail : isUsingUsername;        

        switch (true) {
            case dataToUse === null:
                return responseHelper(res, status.errorRequest, "Username or Email not found", { credential: "Username or Email not found" });
            case dataToUse !== null && checkPassword(password, dataToUse.password) === false:
                return responseHelper(res, status.errorRequest, "Wrong password", { password: "Wrong password" });
            default:
                const signedData = {
                    id: dataToUse.toJSON().id,
                    userRole: dataToUse.userRole,
                };
                const accessToken = accessTokenGenerator(signedData);
                const refreshToken = refreshTokenGenerator(signedData);
                const tokenCookieValue = `${accessToken}${process.env.TOKEN_SEPARATOR}${refreshToken}`;
                parseCookie(res, process.env.TOKEN_COOKIE_NAME, tokenCookieValue, true);

                const updatePayload = { refreshToken };
                const updateResults = await updateByID(USERS, signedData.id, updatePayload);
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

                const loginCredentialCookieValue = `${returnedData?.id}${process.env.TOKEN_SEPARATOR}${returnedData?.refreshToken}`;
                
                parseCookie(res, process.env.LOGIN_CREDENTIAL_COOKIE_NAME, loginCredentialCookieValue.toString(), false);

                pusher.trigger("userAuth", "login-event", {
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

                return responseHelper(res, status.success, "Login success", returnedData);
        }
    } catch (error) {
        responseHelper(res, status.errorRequest, message.errorRequest, JSON.stringify(error));
    }
};