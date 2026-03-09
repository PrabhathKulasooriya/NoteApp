import React from "react";
import { Search, X } from "lucide-react";
import { useAppContext } from "../Context/AppContext";
import NotesSection from "./NotesSection";

const MainSection = () => {
  const { searchTerm, setSearchTerm } = useAppContext();

  return (
  
    <div className="w-full h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
    
      <div className="w-full p-4 flex justify-center border-b border-gray-100 dark:border-slate-800 shrink-0">
        <div className="relative w-2/3 max-w-2xl group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-10 bg-gray-100 dark:bg-slate-800 dark:text-white rounded-2xl 
                       border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-700 
                       focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-grow overflow-y-auto custom-scrollbar">
          <NotesSection />
      </div>
    </div>
  );
};

export default MainSection;
