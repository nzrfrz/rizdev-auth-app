import express from "express";

import userRoute from "./user.route";
import authRoute from "./auth.route";

const router = express.Router();

export default (): express.Router => {
    userRoute(router);
    authRoute(router);
    
    return router;
};