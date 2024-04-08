"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    router.post("/auth/login/", controllers_1.login);
    router.post("/auth/re-send/activation-link/", controllers_1.resendActivationLink);
    router.get("/auth/logout/", middleware_1.cookiesChecker, controllers_1.logout);
    router.get("/auth/check/active-account/id=:id/", controllers_1.checkActiveAccount);
    router.get("/auth/check-link/token=:token/", middleware_1.emailLinkTokenChecker, controllers_1.checkLinkExpiration);
    router.get("/auth/renew-access-token/", middleware_1.cookiesChecker, middleware_1.refreshTokenChecker, controllers_1.renewAccessToken);
    router.get("/auth/activating-account/token=:token/", middleware_1.emailLinkTokenChecker, controllers_1.activatingAccount);
    router.put("/auth/reset-password/", controllers_1.resetPassword);
    router.post("/auth/send/password-recovery-link/", controllers_1.sendPasswordRecoveryLink);
};
//# sourceMappingURL=auth.route.js.map