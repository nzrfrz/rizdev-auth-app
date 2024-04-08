"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegistration = void 0;
const _helpers_1 = require("../_helpers");
const validateRegistration = (req, res, next) => {
    const { username, email, password } = req.body;
    switch (true) {
        case username === "" || username === undefined || username === null:
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Username still empty", { username: "Still empty" });
        case email === "" || email === undefined || email === null:
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Email still empty", { email: "Still empty" });
        case password === "" || password === undefined || password === null:
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Password still empty", { password: "Still empty" });
        case !(0, _helpers_1.emailValidators)(email):
            return (0, _helpers_1.responseHelper)(res, _helpers_1.status.errorRequest, "Not a valid email address", { email: "Not valid" });
        default:
            next();
    }
};
exports.validateRegistration = validateRegistration;
//# sourceMappingURL=validateRegistration.js.map