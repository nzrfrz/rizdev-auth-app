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
exports.getUserAll = void 0;
const _helpers_1 = require("../../_helpers");
const models_1 = require("../../models");
const getUserAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRole = req.accessTokenData.userRole;
        let queryArg = [];
        switch (userRole) {
            case "ROOT":
                queryArg = ["ADMIN", "ENDUSER"];
                break;
            case "ADMIN":
                queryArg = ["ADMIN", "ENDUSER"];
                break;
            case "ENDUSER":
                queryArg = ["ENDUSER"];
                break;
            default:
                break;
        }
        const results = yield (0, _helpers_1.getAllDocument)(models_1.USERS, { userRole: { $in: queryArg } });
        const temp = results.map((data) => {
            const { _id, __v, password, refreshToken } = data, rest = __rest(data, ["_id", "__v", "password", "refreshToken"]);
            return Object.assign(Object.assign({}, rest), { id: data._id });
        });
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, _helpers_1.message.onlySuccess, temp);
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, error.toString());
    }
});
exports.getUserAll = getUserAll;
//# sourceMappingURL=getUserAll.ctrl.js.map