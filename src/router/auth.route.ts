import express from "express";

import { 
    login,
    resetPassword,
    renewAccessToken, 
    activatingAccount,
    checkActiveAccount,
    checkLinkExpiration,
    resendActivationLink,
    sendPasswordRecoveryLink,
    logout,
} from "../controllers";
import { 
    cookiesChecker,
    refreshTokenChecker,
    emailLinkTokenChecker, 
} from "../middleware";

export default (router: express.Router) => {
    router.post("/auth/login/", login);
    router.post("/auth/re-send/activation-link/", resendActivationLink);
    
    router.get("/auth/logout/", cookiesChecker, logout);
    router.get("/auth/check/active-account/id=:id/", checkActiveAccount);
    router.get("/auth/check-link/token=:token/", emailLinkTokenChecker, checkLinkExpiration);
    router.get("/auth/renew-access-token/", cookiesChecker, refreshTokenChecker, renewAccessToken);
    router.get("/auth/activating-account/token=:token/", emailLinkTokenChecker, activatingAccount);

    router.put("/auth/reset-password/", resetPassword);
    router.post("/auth/send/password-recovery-link/", sendPasswordRecoveryLink);
};