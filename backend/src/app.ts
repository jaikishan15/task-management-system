import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { prisma } from "./db/prisma.js";
import authRouter from "./modules/auth/auth.routes.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});

app.get("/db-test", async (_req, res) => {
  const users = await prisma.user.findMany();

  res.json({
    message: "Database connected successfully",
    usersCount: users.length,
  });
});

app.use("/auth", authRouter);

export default app;