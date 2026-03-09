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
        const sharedNotes = await NotesModel.find({collaborators: email});
        return res.status(200).json({success: true, message: "Notes found successfully", notes, sharedNotes});
    }catch(error){
        return res.status(500).json({success: false, message: "Error getting notes"});
    }
};

export const deleteNote = async (req, res) => {
    const noteId = req.params.id;
    const author = req.email;
    try{
        const note = await NotesModel.findOneAndDelete({_id: noteId});
        if(!note){
            return res.status(404).json({success: false, message: "Note not found"});
        }

        if(note.author !== author){
            return res.status(403).json({success: false, message: "You are not authorized to delete this note"});
        }

        return res.status(200).json({success: true, message: "Note deleted successfully"});
    }catch(error){
        return res.status(500).json({success: false, message: "Error deleting note"});
    }
};

export const updateNoteByAuthor = async(req, res)=>{
  const noteId = req.params.id;
  const {title, content, category, collaborators} = req.body;
  const author = req.email;

  try{
    const note = await NotesModel.findOne({_id: noteId});
    if(!note){
      return res.status(404).json({success: false, message: "Note not found"});
    }

    if(note.author !== author){
      return res.status(403).json({success: false, message: "You are not authorized to update this note"});
    }

     await NotesModel.findOneAndUpdate({_id: noteId}, {title, content, category, collaborators, lastEditBy: author});
     return res.status(200).json({success: true, message: "Note updated successfully"});
  }catch(error){
    return res.status(500).json({success: false, message: "Error updating note"});
  }
}

export const addCollaborators = async (req, res) => {
  const noteId = req.params.id;
  const author = req.email;
  const collaborators = req.body.collaborators;

  try {
    const note = await NotesModel.findOne({ _id: noteId });
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    if (note.author !== author) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to update this note",
        });
    }

    note.collaborators = collaborators;
    note.lastEditBy = author;
    await note.save();

    return res
      .status(200)
      .json({ success: true, message: "Access updated successfully" });
  } catch (error) {
    console.error("Collaborator update error:", error); 
    return res
      .status(500)
      .json({ success: false, message: "Error updating collaborators" });
  }
};

export const getSharedNotes = async (req,res) =>{
    const email = req.email.toLowerCase();

    try{
        const notes = await NotesModel.find({collaborators: email});
        return res.status(200).json({success: true, message: "Shared notes found successfully", notes});
    }catch(error){
        return res.status(500).json({success: false, message: "Error getting shared notes"});
    }
}

export const updateSharedNote = async (req,res) => {
  const noteId = req.params.id;
  const {title, content, category,} = req.body;
  const editor = req.email;

  try{

    const allowedUser = await NotesModel.find({collaborators: editor, _id: noteId});
    if(!allowedUser){
      return res.status(403).json({success: false, message: "You are not allowed to update this note"});
    }

    await NotesModel.findOneAndUpdate({_id: noteId}, {title, content, category, lastEditBy: editor});

    return res.status(200).json({ success: true, message: "Shared note updated successfully" });
  }catch(error){
    return res.status(500).json({success: false, message: "Error updating shared note"});
  }

  
}