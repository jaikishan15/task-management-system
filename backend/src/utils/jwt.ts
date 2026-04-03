import jwt from "jsonwebtoken";

type JwtPayload = {
  userId: string;
  email: string;
};

export const generateAccessToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
};