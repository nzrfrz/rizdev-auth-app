import express from "express";

import { 
    status,
    message,
    responseHelper,
    getAllDocument,
    listPaginatedSearch,
} from "../../_helpers";
import { AuthData } from "../../middleware";
import { USERS, UserDocument } from "../../models";

export const usersPaginatedSearch = async (req: AuthData, res: express.Response) => {       
    try {
        const limit = Number(req.query.limit); 
        const page = Number(req.query.page) - 1;
        const per_page = Number(req.query.per_page);
        const searchValue = req.query.q;

        const userRole = req.accessTokenData.userRole;
        
        let queryArg: string[] = [];

        switch (userRole) {
            case "ROOT":
                queryArg = [ "ADMIN", "ENDUSER" ];
                break;
            case "ADMIN":
                queryArg = [ "ADMIN", "ENDUSER" ];
                break;
            case "ENDUSER":
                queryArg = [ "ENDUSER" ];
                break;
            default:
                break;
        }

        const searchQuery = {
            $or: [
                { username: {$regex: searchValue, $options: "i"} },
                { email: {$regex: searchValue, $options: "i"} },
                { userRole: {$regex: searchValue, $options: "i"} },
            ]
        };

        const paginatedSearchQuery = { $and: [ { userRole: { $in: queryArg } }, { _id: {$ne: req.accessTokenData.id} }, searchQuery ] };
       
        const allData = await getAllDocument<UserDocument>(USERS, paginatedSearchQuery);
        const paginatedSearchResults = await listPaginatedSearch<UserDocument>(USERS, paginatedSearchQuery, limit, page, per_page);

        const paginatedSearchFinalData = paginatedSearchResults.reverse().map((data) => {
            const { _id, __v, password, refreshToken, ...rest } = data;
            return {
                ...rest,
                id: data._id
            };
        });        
        
        const returnResults = {
            meta: {
                limit,
                page: Number(req.query.page),
                per_page,
                totalPage: allData.length,
            },
            userList: paginatedSearchFinalData
        };

        responseHelper(res, status.success, message.onlySuccess, returnResults);
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, error.toString());
    }
};