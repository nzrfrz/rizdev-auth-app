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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = void 0;
const _helpers_1 = require("../../_helpers");
const models_1 = require("../../models");
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const userToEdit = yield (0, _helpers_1.findDocByID)(models_1.USERS, id);
        const authUser = yield (0, _helpers_1.findDocByID)(models_1.USERS, req.accessTokenData.id);
        /*
            ROOT user role can edit ADMIN and ENDUSER role
            ADMIN user role can edit ENDUSER role
            
            Logged in user cannot edit self in this route, use change profile routes
        */
        switch (true) {
            case req.accessTokenData.id === id:
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Wrong route, use change profile route", undefined);
            case userToEdit.userRole === authUser.userRole && authUser.refreshToken !== userToEdit.refreshToken:
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Unauthorize User Role", undefined);
            case authUser.userRole === "ENDUSER" && userToEdit.userRole === "ADMIN":
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Unauthorize User Role", undefined);
            case authUser.userRole === "ROOT" && userToEdit.userRole === "ROOT":
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Unauthorize User Role", undefined);
            default:
                const editedPayload = {
                    username,
                    email: email === "" && email !== userToEdit.email ? userToEdit.email : email,
                    isActivated: email === "" && email !== userToEdit.email && userToEdit.isActivated === true ? userToEdit.isActivated : false
                };
                const updateResults = yield (0, _helpers_1.updateByID)(models_1.USERS, id, editedPayload);
                const _a = updateResults.toJSON(), { password, refreshToken } = _a, rest = __rest(_a, ["password", "refreshToken"]);
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, _helpers_1.message.successEdit, rest);
        }
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, error.toString());
    }
});
exports.editUser = editUser;
//# sourceMappingURL=editUser.ctrl.js.map