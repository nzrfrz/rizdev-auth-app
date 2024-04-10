import express from "express";

import { 
    status,
    message,
    responseHelper,
    findDocByID,
    updateByID,
    pusher,
    // webSocketServer,
} from "../../_helpers";
// import WebSocket from 'ws';
import { USERS } from "../../models";
import { AuthData } from "../../middleware";

export const activatingAccount  = async (req: AuthData, res: express.Response) => {
    try {
        const findResults = await findDocByID(USERS, req?.token?.id); 

        if (findResults?.isActivated === true) return responseHelper(res, status.errorRequest, "Account already active", { status: status.errorRequest });
        if (findResults === null) return responseHelper(res, status.notFound, "Account not found", undefined);

        const updatePayload = { isActivated: true };
        const updateResults = await updateByID(USERS, req?.token?.id, updatePayload);

        pusher.trigger("activateAccount", "activateAccount-event", {
            message: updateResults
        });
        
        /*
        if (webSocketServer) {
            webSocketServer.clients.forEach((client: any) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(updateResults));
                }
            });
        }
        */
        
        responseHelper(res, status.success, "Account has been activated", updateResults);
    } catch (error) {     
        responseHelper(res, status.errorServer, message.errorServer, JSON.stringify(error));
    }
};