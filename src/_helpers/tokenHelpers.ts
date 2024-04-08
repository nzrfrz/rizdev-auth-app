import "dotenv/config";
import jwt from "jsonwebtoken";

interface DataToSign {
    id?: string,
    username?: string;
    email?: string;
    userRole?: string
};

export const refreshTokenGenerator = (dataToSign: DataToSign) => {
    const refreshToken = jwt.sign(dataToSign, process.env.REFRESH_TOKEN_SECRET, { algorithm: "HS512", expiresIn: "2h" });
    return refreshToken;
};
 
export const accessTokenGenerator = (dataToSign: DataToSign) => {
    const accessToken = jwt.sign(dataToSign, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS512", expiresIn: "2m" });
    return accessToken;
};

export const emailLinkTokenGenerator = (dataToSign: DataToSign) => {
    const emailLinkToken = jwt.sign(dataToSign, process.env.EMAIL_LINK_TOKEN_SECRET, { algorithm: "HS512", expiresIn: "2m" });
    return emailLinkToken;
};