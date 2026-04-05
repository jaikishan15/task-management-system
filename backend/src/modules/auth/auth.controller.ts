import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "../auth/auth.validations.js";
import { loginUser, logoutUser, refreshUserAccessToken, registerUser } from "./auth.service.js";

export const registerController = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(validatedData);

    return res.status(201).json({
        statusCode:201,
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    if (error.message === "User already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
          statusCode:409,
      });
    }

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues,
          statusCode:500,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
        statusCode:500,
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      statusCode:200,
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({
        success: false,
        message: error.message,
           statusCode:401,
      });
    }

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues,
           statusCode:400,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
         statusCode:500,
    });
  }
};

export const refreshController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    const result = await refreshUserAccessToken(refreshToken);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: result,
         statusCode:200,
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
         statusCode:401,
      message: error.message || "Invalid or expired refresh token",
    });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    await logoutUser(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
         statusCode:200,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
         statusCode:500,
    });
  }
};