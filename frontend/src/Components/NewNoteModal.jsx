import React, { useState } from "react";
import { X, Save, Tag, Users, Type, AlignLeft, Mail, Pin } from "lucide-react";
import { useAppContext } from "../Context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Work",
  "Personal",
  "Coding",
  "Gaming",
  "Health",
  "Entertainment",
  "Ideas",
];

const NewNoteModal = ({ setNewNoteModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [collaborators, setCollaborators] = useState("");

  const { token, setLoading } = useAppContext();
  

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) setNewNoteModal(false);
  };

  const handleSave = async () => {
    setLoading(true);
    const newNote = {
      title,
      content,
      category: category || "Uncategorized",
      collaborators: collaborators
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean),
    };

    try{
    const response = await axios.post("/api/notes/save", newNote,{headers:{token:token}});
    if(response.data.success){
        setLoading(false);
      toast.success(response.data.message);

      setTimeout(()=>{
        setNewNoteModal(false);
      },500)
      
    }
    setNewNoteModal(false);
    }catch(error){
    console.log(error);
    setLoading(false);
    toast.error(error.response.data.message);
    
    }finally{
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-slate-800 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800 shrink-0">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Create New Note
          </h2>
          <button
            onClick={() => setNewNoteModal(false)}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar max-h-[70vh]">
          {/* Title Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Type className="w-4 h-4" /> Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note a name..."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Content Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <AlignLeft className="w-4 h-4" /> Content
            </label>
            <textarea
              value={content}
              rows={4}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* Category Picker */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Tag className="w-4 h-4" /> Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(category === cat ? "" : cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all 
                    ${
                      category === cat
                        ? "bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/20"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Emails Section */}
          <div className="gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Users className="w-4 h-4" /> Collaborators
              </label>
              <input
                type="text"
                value={collaborators}
                onChange={(e) => setCollaborators(e.target.value)}
                placeholder="Comma separated emails"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-gray-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={() => setNewNoteModal(false)}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title || !content || !token}
            className="px-6 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewNoteModal;
