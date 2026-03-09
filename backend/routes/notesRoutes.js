import express from "express";
import { saveNote , getNotes} from "../controllers/notesController.js";
import authMiddleware from "../Middleware/authMiddlware.js";

const notesRouter = express.Router();

notesRouter.post("/save", authMiddleware, saveNote);
notesRouter.get("/get", authMiddleware, getNotes);

export default notesRouter;