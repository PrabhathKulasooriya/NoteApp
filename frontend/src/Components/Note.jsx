import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Clock, User, Edit3 } from "lucide-react";
import { useAppContext } from "../Context/AppContext";
import { format } from "date-fns";

// Ensure Quill's CSS is available so the HTML renders with proper styling
import "react-quill-new/dist/quill.snow.css";

const Note = () => {
  const { styles, notes, sharedNotes } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const note = notes.find((n) => n._id === id) || sharedNotes.find((n) => n._id === id);

  const getCategoryStyle = (category) => {
    return styles[category] || "bg-gray-100 text-gray-700";
  };

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 gap-4 min-h-[50vh]">
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
    <div className="h-screen overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Notes
        </button>

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-8 md:p-10">
          {/* Header & Title */}
          <div className="mb-8">
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium items-center gap-1 mb-4 ${getCategoryStyle(note.category)}`}
            >
              <Tag className="w-3 h-3" />
              {note.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {note.title}
            </h1>
          </div>

          {/* Note Content - Rendered safely as HTML */}
          <div
            className="ql-editor px-0 py-0 text-gray-800 dark:text-slate-200 text-base md:text-lg leading-relaxed max-w-none min-h-[200px]"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />

          <hr className="border-gray-100 dark:border-slate-700 mt-12 mb-8" />

          {/* Collaborators */}
          <div className="flex flex-col  flex-wrap justify-start items-start gap-2  p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Collaborators
            </p>
            {note.collaborators.map((collaborator) => (
              <div key={collaborator} className="flex items-center gap-3">
                <div className="p-2.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg shrink-0 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    {collaborator}
                  </p>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5"></div>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-gray-100 dark:border-slate-700 mt-12 mb-8" />

          {/* Footer */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-6 sm:gap-12 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 overflow-x-scroll md:overflow-x-auto dark:border-slate-800">
            {/* Created Info */}
            <div className="flex items-center justify-between gap-3">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shrink-0 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                  Owner
                </p>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {note.author}
                </div>
                <span className="flex items-center gap-1.5 text-slate-500 text-sm dark:text-slate-400 mt-0.5">
                  {note.createdAt
                    ? format(
                        new Date(note.createdAt),
                        "MMM d, yyyy 'at' h:mm a",
                      )
                    : "Unknown date"}
                </span>
              </div>
            </div>

            {/* Last Edited Info */}
            {note.lastEditBy && (
              <div className="flex items-center justify-between gap-3">
                <div className="p-2.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg shrink-0 flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 ">
                    Last Update
                  </p>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex flex-col gap-1">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {note.lastEditBy}
                    </span>
                    <span className="flex items-center text-sm gap-1.5 text-slate-500 dark:text-slate-400 mt-0.5">
                      {note.updatedAt
                        ? format(
                            new Date(note.updatedAt),
                            "MMM d, yyyy 'at' h:mm a",
                          )
                        : "Unknown date"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
