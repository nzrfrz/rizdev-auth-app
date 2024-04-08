"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookie = exports.parseCookie = void 0;
const toMilSeconds_1 = require("./toMilSeconds");
// 2 mins = 120000
// 5 mins = 300000
// 2 hours = 18000000
// miliseconds = minute * 60000
// seconds = minute * 60
const cookieOptions = {
    secure: true,
    sameSite: "none",
    path: "/",
    domain: undefined,
    maxAge: (0, toMilSeconds_1.toMilSeconds)(0, 5, 0),
};
const parseCookie = (res, name, value, httpOnly) => {
    return res.cookie(name, value, Object.assign(Object.assign({}, cookieOptions), { httpOnly: httpOnly }));
};
exports.parseCookie = parseCookie;
const clearCookie = (res, name) => {
    return res.clearCookie(name);
    // return res.cookie(name, "", cookieOptions);
};
exports.clearCookie = clearCookie;
//# sourceMappingURL=cookieHelpers.js.map