import express from "express";
import { toMilSeconds } from "./toMilSeconds";

// 2 mins = 120000
// 5 mins = 300000
// 2 hours = 18000000
// miliseconds = minute * 60000
// seconds = minute * 60

const cookieOptions: Record<string, any> = {
    secure: true,
    sameSite: "none",
    path: "/",
    domain: undefined,
    maxAge: toMilSeconds(0, 5, 0),
};

export const parseCookie = (res: express.Response, name: string, value: string, httpOnly: boolean) => {
    return res.cookie(name, value, { ...cookieOptions, httpOnly: httpOnly });
};

export const clearCookie = (res: express.Response, name: string) => {
    return res.clearCookie(name);
    // return res.cookie(name, "", cookieOptions);
};