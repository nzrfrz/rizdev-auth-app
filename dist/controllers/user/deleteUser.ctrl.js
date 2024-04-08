"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const _helpers_1 = require("../../_helpers");
const models_1 = require("../../models");
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userToDelete = yield (0, _helpers_1.findDocByID)(models_1.USERS, id);
        const authUser = yield (0, _helpers_1.findDocByID)(models_1.USERS, req.accessTokenData.id);
        /*
            ROOT user role can delete ADMIN and ENDUSER role
            ADMIN user role can delete ENDUSER role
        */
        switch (true) {
            case authUser.userRole === "ADMIN" && userToDelete.userRole === "ADMIN":
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Unauthorize User Role", undefined);
            case authUser.userRole === "ENDUSER" && userToDelete.userRole === "ADMIN":
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Unauthorize User Role", undefined);
            case authUser.userRole === "ENDUSER" && userToDelete.userRole === "ENDUSER":
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Unauthorize User Role", undefined);
            case authUser.userRole === "ROOT" && userToDelete.userRole === "ROOT":
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Unauthorize User Role", undefined);
            default:
                const updateResults = yield (0, _helpers_1.deleteByID)(models_1.USERS, id);
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, _helpers_1.message.successDelete, updateResults);
        }
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, JSON.stringify(error));
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=deleteUser.ctrl.js.map