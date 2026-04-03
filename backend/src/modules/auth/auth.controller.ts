import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "../auth/auth.validations.js";
import { loginUser, registerUser } from "./auth.service.js";

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

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};