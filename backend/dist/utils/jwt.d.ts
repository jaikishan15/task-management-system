import jwt from "jsonwebtoken";
type JwtPayload = {
    userId: string;
    email: string;
};
export declare const generateAccessToken: (payload: JwtPayload) => string;
export declare const generateRefreshToken: (payload: JwtPayload) => string;
export declare const verifyAccessToken: (token: string) => string | jwt.JwtPayload;
export declare const verifyRefreshToken: (token: string) => string | jwt.JwtPayload;
export {};
//# sourceMappingURL=jwt.d.ts.map