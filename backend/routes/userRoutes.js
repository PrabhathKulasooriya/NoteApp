import express from "express";
import { createUser, loginUser, editUser, getUser } from "../controllers/userController.js";
import authMiddleware from "../Middleware/authMiddlware.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/edit", authMiddleware, editUser);
userRouter.get("/get", authMiddleware, getUser);

export default userRouter;