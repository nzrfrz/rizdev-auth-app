"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const hashedPassword = bcrypt_1.default.hashSync(password, salt);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const checkPassword = (bodyPassword, storedPassword) => {
    const compareResult = bcrypt_1.default.compareSync(bodyPassword, storedPassword);
    return compareResult;
};
exports.checkPassword = checkPassword;
//# sourceMappingURL=passwordHelpers.js.map