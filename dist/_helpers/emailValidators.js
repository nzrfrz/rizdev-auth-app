"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidators = void 0;
const emailValidators = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};
exports.emailValidators = emailValidators;
//# sourceMappingURL=emailValidators.js.map