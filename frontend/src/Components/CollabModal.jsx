import React, { useState } from "react";
import { X, Users, UserPlus, UserMinus, Mail } from "lucide-react";
import { useAppContext } from "../Context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const CollabModal = ({ setModalOpen, note }) => {
  const [collaborators, setCollaborators] = useState(note?.collaborators || []);
  const [emailInput, setEmailInput] = useState("");

  const { token, setLoading, fetchNotes } = useAppContext();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) setModalOpen(false);
  };

  const handleAddEmail = (e) => {
    e.preventDefault();
    const trimmedEmail = emailInput.trim();

    if (!trimmedEmail) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (collaborators.includes(trimmedEmail)) {
      toast.error("User is already a collaborator");
      return;
    }

    setCollaborators([...collaborators, trimmedEmail]);
    setEmailInput(""); 
  };

  const handleRemoveEmail = (emailToRemove) => {
    setCollaborators(collaborators.filter((email) => email !== emailToRemove));
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `/api/notes/addCollaborators/${note._id}`,
        {collaborators: collaborators},
        {
          headers: { token: token },
        },
      );

      if (response.data.success) {
        fetchNotes(token);
        setModalOpen(false)
        setLoading(false);
        toast.success("Collaborators updated successfully");
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to update collaborators",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Share Note
          </h2>
          <button
            onClick={() => setModalOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Invite others to view and edit{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              "{note?.title}"
            </span>
            .
          </p>

          {/* Add Email Form */}
          <form onSubmit={handleAddEmail} className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email address"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Add to List
            </button>
          </form>

          {/* Current Collaborators List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Current Collaborators ({collaborators.length})
            </h3>

            <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar pr-1">
              {collaborators.length === 0 ? (
                <p className="text-sm text-slate-500 italic py-2">
                  No one else has access yet.
                </p>
              ) : (
                collaborators.map((email) => (
                  <div
                    key={email}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50"
                  >
                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate pr-4">
                      {email}
                    </span>
                    <button
                      onClick={() => handleRemoveEmail(email)}
                      className="text-red-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Remove access"
                    >
                      <UserMinus className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-3">
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            
            onClick={handleSave}
            className="px-6 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollabModal;
