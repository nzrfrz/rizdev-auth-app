import express from "express";

import { 
    status,
    message,
    responseHelper,
    bulkCreate,
    randomColorGenerator
} from "../../_helpers";
import { USERS, UserDocument } from "../../models";

export const bulkRegistration = async (req: express.Request, res: express.Response) => {
    try {
        const usersData = req.body;        
        if (usersData.length === 1 || usersData.length === undefined) return responseHelper(res, status.errorRequest, "Bulk create must have 2 or more objects", {});

        let resultsPool: UserDocument[] = [];
        for (let index = 0; index < usersData.length; index++) {
            const element = usersData[index];
            const data = {
                ...element,
                refreshToken: "",
                avatarColor: randomColorGenerator(),
                avatarImage: {
                    id: "",
                    url: ""
                },
                isActivated: false,
            };
            const bulkCreateResults = await bulkCreate(USERS, data);
            resultsPool.push(bulkCreateResults);
        }
        responseHelper(res, status.success, message.onlySuccess, resultsPool);
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, JSON.stringify(error));
    }
};