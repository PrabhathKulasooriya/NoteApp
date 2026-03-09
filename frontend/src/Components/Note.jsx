import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { useAppContext } from "../Context/AppContext";

const Note = () => {
  const { styles, notes } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const note = notes.find((n) => n._id === id); 

  const getCategoryStyle = (category) => {
    return styles[category] || "bg-gray-100 text-gray-700";
  };

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 gap-4">
        <p className="text-lg">Note not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Notes
        </button>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getCategoryStyle(note.category)}`}
            >
              <Tag className="w-3 h-3" />
              {note.category}
            </span>
            <span className="text-gray-400 dark:text-slate-500 flex items-center gap-1 text-xs">
              <Calendar className="w-3 h-3" />
              {note.updatedAt}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-snug">
            {note.title}
          </h1>

          <hr className="border-gray-100 dark:border-slate-700 mb-6" />

          <p className="text-gray-700 dark:text-slate-300 text-base leading-relaxed whitespace-pre-wrap">
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Note;
