import express from "express";

import { 
    userProfile,
    registration,
    bulkRegistration,
    getUserAll,
    usersPaginatedSearch,
    changeProfileUsernameAndEmail,
    changeProfilePassword,
    editUser,
    deleteUser,
} from "../controllers";
import { 
    cookiesChecker, 
    accessTokenChecker, 
    validateRegistration,
} from "../middleware";

export default (router: express.Router) => {
    router.post("/user/bulk-registration/", bulkRegistration);
    router.post("/user/registration/", validateRegistration, registration);

    router.get("/user/all/", cookiesChecker, accessTokenChecker, getUserAll);
    router.get("/user/profile/", cookiesChecker, accessTokenChecker, userProfile);
    router.get("/user/paginated-search/", cookiesChecker, accessTokenChecker, usersPaginatedSearch);

    router.put("/user/edit/id=:id/", cookiesChecker, accessTokenChecker, editUser);
    router.put("/user/change-profile/password/", cookiesChecker, accessTokenChecker, changeProfilePassword);
    router.put("/user/change-profile/username-email/", cookiesChecker, accessTokenChecker, changeProfileUsernameAndEmail);

    router.delete("/user/delete/id=:id/", cookiesChecker, accessTokenChecker, deleteUser);
};