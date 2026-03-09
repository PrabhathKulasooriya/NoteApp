import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("");
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);

  const fetchNotes = async (authtoken) => {
    try {
      const response = await axios.get("/api/notes/get", {
        headers: { token: authtoken },
      });
      if (response.data.success) {
        setNotes(response.data.notes);
        setSharedNotes(response.data.sharedNotes);
      }
    } catch (error) {
      console.log(error);
    }
  }


  // Change Theme
  useEffect(() => {
    const storedtheme = localStorage.getItem("theme");
    if(storedtheme){setTheme(storedtheme);}
    if (storedtheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    
  }, [theme]);

  //Get Token from Local Storage and Fetch Notes
  useEffect(() => {
    const getTokenFromStorage = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {

        setToken(storedToken);
        const response = await axios.get("/api/user/get", {
          headers: { token: storedToken },
        });

        if (response.data.success) {
          setUser(response.data.user);
        }
        fetchNotes(storedToken);
      }
    };
    getTokenFromStorage();
  }, []);

  //  Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    toast.success("User logged out successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`/api/notes/delete/${id}`, {
        headers: { token: token },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchNotes(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const styles = {
    Personal:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Work: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Gaming:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Health: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Coding:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Entertainment:
      "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  };

  const value = {
    theme,
    setTheme,
    user,
    setUser,
    showLogin,
    setShowLogin,
    loading,
    setLoading,
    token,
    setToken,
    logout,
    searchTerm,
    setSearchTerm,
    notes,
    styles,
    fetchNotes,
    deleteNote,
    sharedNotes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
