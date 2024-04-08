import express from "express";

import { 
    status,
    message,
    responseHelper,
    findDocByID,
    deleteByID
} from "../../_helpers";
import { AuthData } from "../../middleware";
import { USERS, UserDocument } from "../../models";

export const deleteUser = async (req: AuthData, res: express.Response) => {
    try {
        const { id } = req.params;
        const userToDelete = await findDocByID<UserDocument>(USERS, id);
        const authUser = await findDocByID<UserDocument>(USERS, req.accessTokenData.id);

        /*
            ROOT user role can delete ADMIN and ENDUSER role
            ADMIN user role can delete ENDUSER role
        */
        switch (true) {
            case authUser.userRole === "ADMIN" && userToDelete.userRole === "ADMIN":
                return responseHelper(res, status.errorRequest, "Unauthorize User Role", undefined);
            case authUser.userRole === "ENDUSER" && userToDelete.userRole === "ADMIN":
                return responseHelper(res, status.errorRequest, "Unauthorize User Role", undefined);
            case authUser.userRole === "ENDUSER" && userToDelete.userRole === "ENDUSER":
                return responseHelper(res, status.errorRequest, "Unauthorize User Role", undefined);
            case authUser.userRole === "ROOT" && userToDelete.userRole === "ROOT":
                return responseHelper(res, status.errorRequest, "Unauthorize User Role", undefined);
            default:
                const updateResults = await deleteByID<UserDocument>(USERS, id);             
                return responseHelper(res, status.success, message.successDelete, updateResults);
        }
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, JSON.stringify(error));
    }
};