import type { Request, Response } from "express";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";

jest.unstable_mockModule("./auth.service.js", () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
  refreshUserAccessToken: jest.fn(),
  logoutUser: jest.fn(),
}));

const authService = await import("./auth.service.js");
const {
  registerController,
  loginController,
  refreshController,
  logoutController,
} = await import("./auth.controller.js");

const mockResponse = () => {
  const res = {} as Response;

  res.status = jest.fn().mockReturnValue(res) as any;
  res.json = jest.fn().mockReturnValue(res) as any;
  res.cookie = jest.fn().mockReturnValue(res) as any;
  res.clearCookie = jest.fn().mockReturnValue(res) as any;

  return res;
};

describe("Auth Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerController", () => {
    it("should register user successfully", async () => {
      const req = {
        body: {
          name: "Jai",
          email: "jai@test.com",
          password: "123456",
        },
      } as Request;

      const res = mockResponse();

      const mockUser = {
        id: "1",
        name: "Jai",
        email: "jai@test.com",
      };

      jest.mocked(authService.registerUser).mockResolvedValue(mockUser as any);

      await registerController(req, res);

      expect(authService.registerUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: mockUser,
      });
    });

    it("should return 409 if user already exists", async () => {
      const req = {
        body: {
          name: "Jai",
          email: "jai@test.com",
          password: "123456",
        },
      } as Request;

      const res = mockResponse();

      jest
        .mocked(authService.registerUser)
        .mockRejectedValue(new Error("User already exists"));

      await registerController(req, res);

      expect(authService.registerUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "User already exists",
        statusCode: 409,
      });
    });
  });

describe("loginController", () => {
  it("should login user successfully and set refresh token cookie", async () => {
    const req = {
      body: {
        email: "jai@test.com",
        password: "123456",
      },
    } as Request;

    const res = mockResponse();

    const mockResult = {
      user: {
        id: "1",
        email: "jai@test.com",
      },
      accessToken: "access-token",
      refreshToken: "refresh-token",
    };

    jest.mocked(authService.loginUser).mockResolvedValue(mockResult as any);

    await loginController(req, res);

    expect(authService.loginUser).toHaveBeenCalledWith(req.body);

    expect(res.cookie).toHaveBeenCalledWith("refreshToken", "refresh-token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Login successful",
      statusCode: 200,
      data: {
        user: mockResult.user,
        accessToken: mockResult.accessToken,
      },
    });
  });

  it("should return 401 for invalid credentials", async () => {
    const req = {
      body: {
        email: "jai@test.com",
        password: "wrong-password",
      },
    } as Request;

    const res = mockResponse();

    jest
      .mocked(authService.loginUser)
      .mockRejectedValue(new Error("Invalid credentials"));

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid credentials",
      statusCode: 401,
    });
  });
});

describe("refreshController", () => {
  it("should refresh access token successfully", async () => {
    const req = {
      cookies: {
        refreshToken: "refresh-token",
      },
    } as Request;

    const res = mockResponse();

    const mockResult = {
      accessToken: "new-access-token",
    };

    jest
      .mocked(authService.refreshUserAccessToken)
      .mockResolvedValue(mockResult as any);

    await refreshController(req, res);

    expect(authService.refreshUserAccessToken).toHaveBeenCalledWith(
      "refresh-token"
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Access token refreshed successfully",
      data: mockResult,
      statusCode: 200,
    });
  });

  it("should return 401 if refresh token is invalid", async () => {
    const req = {
      cookies: {
        refreshToken: "invalid-token",
      },
    } as Request;

    const res = mockResponse();

    jest
      .mocked(authService.refreshUserAccessToken)
      .mockRejectedValue(new Error("Invalid or expired refresh token"));

    await refreshController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      statusCode: 401,
      message: "Invalid or expired refresh token",
    });
  });
});

describe("logoutController", () => {
  it("should logout user successfully and clear cookie", async () => {
    const req = {
      cookies: {
        refreshToken: "refresh-token",
      },
    } as Request;

    const res = mockResponse();

    jest.mocked(authService.logoutUser).mockResolvedValue(undefined as any);

    await logoutController(req, res);

    expect(authService.logoutUser).toHaveBeenCalledWith("refresh-token");

    expect(res.clearCookie).toHaveBeenCalledWith("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Logout successful",
      statusCode: 200,
    });
  });

  it("should return 500 if logout fails", async () => {
    const req = {
      cookies: {
        refreshToken: "refresh-token",
      },
    } as Request;

    const res = mockResponse();

    jest.mocked(authService.logoutUser).mockRejectedValue(new Error("DB error"));

    await logoutController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Something went wrong",
      statusCode: 500,
    });
  });
});
});