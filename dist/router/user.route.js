"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    router.post("/user/bulk-registration/", controllers_1.bulkRegistration);
    router.post("/user/registration/", middleware_1.validateRegistration, controllers_1.registration);
    router.get("/user/all/", middleware_1.cookiesChecker, middleware_1.accessTokenChecker, controllers_1.getUserAll);
    router.get("/user/profile/", middleware_1.cookiesChecker, middleware_1.accessTokenChecker, controllers_1.userProfile);
    router.get("/user/paginated-search/", middleware_1.cookiesChecker, middleware_1.accessTokenChecker, controllers_1.usersPaginatedSearch);
    router.put("/user/edit/id=:id/", middleware_1.cookiesChecker, middleware_1.accessTokenChecker, controllers_1.editUser);
    router.put("/user/change-profile/password/", middleware_1.cookiesChecker, middleware_1.accessTokenChecker, controllers_1.changeProfilePassword);
    router.put("/user/change-profile/username-email/", middleware_1.cookiesChecker, middleware_1.accessTokenChecker, controllers_1.changeProfileUsernameAndEmail);
    router.delete("/user/delete/id=:id/", middleware_1.cookiesChecker, middleware_1.accessTokenChecker, controllers_1.deleteUser);
};
//# sourceMappingURL=user.route.js.map