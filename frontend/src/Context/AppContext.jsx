import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
     const [theme, setTheme] = useState("light");
     const[user, setUser] = useState(null);
     const[showLogin, setShowLogin] = useState(false);
     const [token, setToken] = useState("");

    // Change Theme
     useEffect(() => {
       if (theme === "dark") {
         document.documentElement.classList.add("dark");
       } else {
         document.documentElement.classList.remove("dark");
       }
       localStorage.setItem("theme", theme);
     }, [theme]);

     //Get Token from Local Storage
     useEffect(() => {
       const getTokenFromStorage = async () => {
         const storedToken = localStorage.getItem("token");
         if (storedToken) {
           setToken(storedToken);
           const response = await axios.get("/api/user/get",{ headers: { token: storedToken } });
           if (response.data.success) {
             setUser(response.data.user);
           }
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




     const value = {theme, setTheme, user, setUser, showLogin, setShowLogin, loading, setLoading, token, setToken, logout};

     return (
       <AppContext.Provider value={value}>
         {children}
       </AppContext.Provider>
     );
};

export const useAppContext = () => useContext(AppContext);  