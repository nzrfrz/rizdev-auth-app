import express from "express";

import { 
    status,
    message,
    updateByID,
    clearCookie,
    findDocByID,
    responseHelper,
} from "../../_helpers";
import { AuthData } from "../../middleware";
import { USERS, UserDocument } from "../../models";

export const editUser = async (req: AuthData, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const userToEdit = await findDocByID<UserDocument>(USERS, id);
        const authUser = await findDocByID<UserDocument>(USERS, req.accessTokenData.id);

        /*
            ROOT user role can edit ADMIN and ENDUSER role
            ADMIN user role can edit ENDUSER role
            
            Logged in user cannot edit self in this route, use change profile routes
        */
        switch (true) {
            case req.accessTokenData.id === id:
                return responseHelper(res, status.errorRequest, "Wrong route, use change profile route", undefined);
            case userToEdit.userRole === authUser.userRole && authUser.refreshToken !== userToEdit.refreshToken:
                return responseHelper(res, status.errorRequest, "Unauthorize User Role", undefined);
            case authUser.userRole === "ENDUSER" && userToEdit.userRole === "ADMIN":
                return responseHelper(res, status.errorRequest, "Unauthorize User Role", undefined);
            case authUser.userRole === "ROOT" && userToEdit.userRole === "ROOT":
                return responseHelper(res, status.errorRequest, "Unauthorize User Role", undefined);
            default:
                const editedPayload = {
                    username,
                    email: email === "" && email !== userToEdit.email ? userToEdit.email : email,
                    isActivated: email === "" && email !== userToEdit.email && userToEdit.isActivated === true ? userToEdit.isActivated : false
                };
                const updateResults = await updateByID<UserDocument>(USERS, id, editedPayload);
                const { password, refreshToken, ...rest } = updateResults.toJSON();                
                return responseHelper(res, status.success, message.successEdit, rest);
        }
    } catch (error) {
        responseHelper(res, status.errorServer, message.errorServer, error.toString());
    }
};