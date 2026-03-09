import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: "Uncategorized",
      enum: [
        "Work",
        "Personal",
        "Coding",
        "Gaming",
        "Health",
        "Entertainment",
        "Ideas",
        "Uncategorized",
      ],
    },
    author: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    collaborators: {
      type: [String],
      required: false,
    },
    lastEditBy: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const NotesModel = mongoose.models.Notes || mongoose.model("Notes", notesSchema);

export  default NotesModel;