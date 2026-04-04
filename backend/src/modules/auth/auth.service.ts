import { prisma } from "../../db/prisma.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.js";
import type { LoginInput, RegisterInput } from "../auth/auth.validations.js";

export const registerUser = async (data: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginUser = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await comparePassword(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    userId: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async (refreshToken: string) => {
  if (!refreshToken) return;

  const user = await prisma.user.findFirst({
    where: { refreshToken },
  });

  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: null },
  });
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  const decoded = verifyRefreshToken(refreshToken) as {
    userId: string;
    email: string;
  };

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user || user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
  });

  return {
    accessToken: newAccessToken,
  };
};