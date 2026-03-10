import React, { useState } from "react";
import {
  Calendar,
  Tag,
  Eye,
  SquarePen,
  LogIn,
} from "lucide-react";

import { useAppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";
import CollabNoteModal from "./CollabNoteModal";
import logo from "../assets/logo.png";
import { format } from "date-fns";


const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const CollabNotesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const { searchTerm, sharedNotes, styles, token, setShowLogin } =
    useAppContext();


  const filteredNotes = sharedNotes.filter((note) => {
    const term = searchTerm.toLowerCase();
    const plainContent = stripHtml(note.content).toLowerCase();

    return (
      note.title.toLowerCase().includes(term) ||
      plainContent.includes(term) ||
      note.category.toLowerCase().includes(term)
    );
  });

  const getCategoryStyle = (category) => {
    return styles[category] || "bg-gray-100 text-gray-700";
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
  };

  if (!token) {
    return (
      <div className="flex-1 w-full flex items-center justify-center p-6 transition-colors duration-300">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="space-y-3">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
              <div className="relative w-20 h-20 mx-auto bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-3xl shadow-xl flex items-center justify-center">
                <img src={logo} alt="" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome to <span className="text-blue-500">Notely</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              Your personal space for taking notes.
            </p>
          </div>
          <div className="p-8 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 rounded-[2rem] space-y-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Sign in to access your saved notes and collaborate with your team.
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] transition-all"
            >
              <LogIn className="w-5 h-5" />
              Get Started
            </button>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
            Secure • Collaborative • Fast
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {token && filteredNotes.length === 0 && (
          <p className="col-span-3 text-center text-gray-400 dark:text-slate-500 py-16">
            No notes found
          </p>
        )}

        {filteredNotes.map((note) => (
          <div
            key={note._id}
            className="group flex flex-col items-start justify-between relative p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
          >
            {/* Category Badge */}
            <div className="flex justify-between items-start mb-4 w-full">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getCategoryStyle(note.category)}`}
              >
                <Tag className="w-3 h-3" />
                {note.category}
              </span>
              <span className="text-gray-400 dark:text-slate-500 flex items-center gap-1 text-xs">
                <Calendar className="w-3 h-3" />
                {format(new Date(note.updatedAt), "MMM d, yyyy h:mm a")}
              </span>
            </div>

            {/* Note Content */}
            <div className="">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 ">
                {note.title}
              </h3>

              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 max-w-85 overflow-x-hidden">
                {stripHtml(note.content)}
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-row justify-center items-center w-full gap-12 items-center mt-4 dark:text-slate-400">
              <Link to={`/note/${note._id}`}>
                <Eye className="hover:text-blue-600 cursor-pointer" />
              </Link>

              <div onClick={() => handleEditNote(note)}>
                <SquarePen className="hover:text-yellow-600 cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CollabNoteModal
          setModalOpen={setIsModalOpen}
          existingNote={noteToEdit}
        />
      )}
    </div>
  );
};

export default CollabNotesSection;
