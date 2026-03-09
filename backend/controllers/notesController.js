import NotesModel from "../models/notesModel.js";

export const saveNote = async (req, res) => {
  const { title, content, category, collaborators } = req.body;
  const author = req.email;

  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ success: false, message: "Missing field data" });
  }

  try {
    const newNote = new NotesModel({
      title,
      content,
      category: category || "Uncategorized",
      collaborators: collaborators || [],
      author,
    });
    const note = await newNote.save();
    return res
      .status(200)
      .json({ success: true, message: "Note saved successfully" }, note);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error saving note" });
  }
};

export const getNotes = async (req, res) => {
    const email = req.email;

    try{
        const notes = await NotesModel.find({author: email});
        return res.status(200).json({success: true, message: "Notes found successfully", notes});
    }catch(error){
        return res.status(500).json({success: false, message: "Error getting notes"});
    }
};
