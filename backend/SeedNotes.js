import mongoose from "mongoose";
import NotesModel from "./models/notesModel.js"; 

const MONGO_URI ="mongodb+srv://admin:20000980096522008@cluster0.v0glvi8.mongodb.net/NoteApp";

const dummyNotes = [
  {
    title: "Grocery List",
    content: "Buy milk, eggs, bread, and some fresh cilantro for the curry.",
    category: "Personal",
    collaborators: [],
    author: "prabhath.kulasooriya@gmail.com",
  },
  {
    title: "MERN Stack Project",
    content:
      "Finish the Stripe integration for the Foodie app and debug the Redux store.",
    category: "Work",
    collaborators: [],
    author: "prabhath.kulasooriya@gmail.com",
  },
  {
    title: "Game Strategy: ETS2",
    content:
      "Plan the new route from Berlin to Warsaw. Check fuel prices in Poland.",
    category: "Gaming",
    collaborators: [],
    author: "prabhath.kulasooriya@gmail.com",
  },
  {
    title: "Gym Routine",
    content: "Push day: Bench press 3x10, Overhead press 3x12, Lateral raises.",
    category: "Health",
    collaborators: [],
    author: "prabhath.kulasooriya@gmail.com",
  },
  {
    title: "Tailwind Tips",
    content:
      "Use 'group-focus-within' for interactive search bars and 'backdrop-blur' for glassmorphism.",
    category: "Coding",
    collaborators: [],
    author: "prabhath.kulasooriya@gmail.com",
  },
  {
    title: "Movie Recommendations",
    content:
      "Interstellar, Inception, and The Dark Knight. Rewatch the Lord of the Rings trilogy.",
    category: "Entertainment",
    collaborators: [],
    author: "prabhath.kulasooriya@gmail.com",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await NotesModel.deleteMany({}); // optional: clears existing notes first
    console.log("🗑️  Cleared existing notes");

    const inserted = await NotesModel.insertMany(dummyNotes);
    console.log(`📝 Inserted ${inserted.length} notes successfully`);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

seed();
