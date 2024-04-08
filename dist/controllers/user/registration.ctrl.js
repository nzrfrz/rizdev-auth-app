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
exports.registration = void 0;
const _helpers_1 = require("../../_helpers");
const models_1 = require("../../models");
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, userRole } = req.body;
        const isUsernameExist = yield (0, _helpers_1.findOneDocument)(models_1.USERS, { username });
        const isEmailExist = yield (0, _helpers_1.findOneDocument)(models_1.USERS, { email });
        switch (true) {
            case isUsernameExist !== null:
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Username already exist", { username: "Username already exist" });
            case isEmailExist !== null:
                return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Email already associated with this account", { email: "Email already associated with this account" });
            default:
                const payload = new models_1.USERS({
                    username,
                    email,
                    password: (0, _helpers_1.hashPassword)(password),
                    userRole,
                    refreshToken: "",
                    avatarColor: (0, _helpers_1.randomColorGenerator)(),
                    avatarImage: {
                        id: "",
                        url: ""
                    },
                    isActivated: false
                });
                const saveResults = yield (0, _helpers_1.saveNewDocument)(payload);
                const generateToken = (0, _helpers_1.emailLinkTokenGenerator)({ id: saveResults === null || saveResults === void 0 ? void 0 : saveResults._id.toString() });
                yield (0, _helpers_1.sendEmail)(email, "Account Activation", "Account Activation", "accountActivation", { username, url: `${req.headers.origin}/activating-account/${generateToken}` });
                (0, _helpers_1.responseHelper)(res, _helpers_1.status.success, _helpers_1.message.onlySuccess, saveResults);
                break;
        }
    }
    catch (error) {
        (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorServer, _helpers_1.message.errorServer, JSON.stringify(error));
    }
});
exports.registration = registration;
//# sourceMappingURL=registration.ctrl.js.map