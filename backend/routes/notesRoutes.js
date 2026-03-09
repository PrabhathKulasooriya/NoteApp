import express from "express";
import {
  saveNote,
  getNotes,
  deleteNote,
  updateNoteByAuthor,
  addCollaborators,
  getSharedNotes,
  updateSharedNote,
} from "../controllers/notesController.js";
import authMiddleware from "../Middleware/authMiddlware.js";

const notesRouter = express.Router();

notesRouter.post("/save", authMiddleware, saveNote);
notesRouter.get("/get", authMiddleware, getNotes);
notesRouter.delete("/delete/:id", authMiddleware, deleteNote);
notesRouter.post("/update/:id", authMiddleware, updateNoteByAuthor);
notesRouter.post("/addCollaborators/:id", authMiddleware, addCollaborators);
notesRouter.get("/shared", authMiddleware, getSharedNotes);
notesRouter.post("/updateShared/:id", authMiddleware, updateSharedNote);

export default notesRouter;