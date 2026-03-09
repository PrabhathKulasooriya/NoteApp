import React, {useState} from "react";
import { Calendar, Tag } from "lucide-react";
import { useAppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";
import {NotebookPen} from "lucide-react";
import NewNoteModal from "./NewNoteModal";

const NotesSection = () => {

  const [newNoteModal, setNewNoteModal] = useState(false);
  const { searchTerm, notes, styles, token  } = useAppContext();

  const filteredNotes = notes.filter((note) => {
    const term = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term) ||
      note.category.toLowerCase().includes(term)
    );
  });

  
  const getCategoryStyle = (category) => {
    return styles[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 ">
      {/* New Note Button */}
      <div className="w-full flex justify-end mb-2">
        <button className="border p-2 mb-4 rounded-md flex flex-row gap-2 text-blue-500 dark:text-blue-400 dark:bg-slate-800 h-10 transition-all duration-300 hover:bg-blue-100 dark:hover:bg-slate-700 hover:scale-105"
          onClick={() => setNewNoteModal(true)}>
          <NotebookPen className="w-5 h-5" />
          <p className="group-hover:text-blue-600  transition-all duration-300 font-bold">
            New Note
          </p>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {token &&filteredNotes.length === 0 && (
          <p className="col-span-3 text-center text-gray-400 dark:text-slate-500 py-16">
            No notes found for "{searchTerm}"
          </p>
        )}

        {filteredNotes.map((note) => (
          <Link
            to={`/note/${note._id}`}
            key={note._id}
            className="group relative p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 
                      rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
          >
            {/* Category Badge */}
            <div className="flex justify-between items-start mb-4">
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

            {/* Note Content */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
              {note.title}
            </h3>
            <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
              {note.content}
            </p>
          </Link>
        ))}
      </div>


      {/* New Note Form */}
      {newNoteModal && <NewNoteModal {...{setNewNoteModal}}/>}
    </div>
  );
};

export default NotesSection;
