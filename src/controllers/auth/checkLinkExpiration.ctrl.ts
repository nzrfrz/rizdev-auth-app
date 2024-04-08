import "dotenv/config";
import express from "express";

import { 
    status,
    message,
    responseHelper,
} from "../../_helpers";
import { AuthData } from "../../middleware";

export const checkLinkExpiration = async (req: AuthData, res: express.Response) => {
    try {
        responseHelper(res, status.accepted, message.onlySuccess, req?.token);
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, JSON.stringify(error.response));
    }
};