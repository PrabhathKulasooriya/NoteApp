import express from "express";
import { createUser, loginUser, editUser } from "../controllers/userController.js";
import authMiddleware from "../Middleware/authMiddlware.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.get("/login", loginUser);
userRouter.post("/edit", authMiddleware, editUser);

export default userRouter;