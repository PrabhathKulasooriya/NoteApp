import {useState, useEffect} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainSection from "./Components/MainSection";
import UserAccount from "./Components/UserAccount";
import Sidebar from "./Components/Sidebar";
import { useAppContext } from "./Context/AppContext";
import Login from "./Components/Login";
import { Toaster } from "react-hot-toast";

function App() {

  const location = useLocation();
  const {user, showLogin, loading, setLoading} = useAppContext();
 

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setLoading(true);
    }, 0);

    const endTimer = setTimeout(() => {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [location.pathname]);


  return (
    <div className="flex flex-row h-screen w-screen justify-start items-start max-w-screen overflow-x-hidden relative dark:bg-gray-900">

      {loading && (
        <div className="fixed inset-0 bg-white z-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="text-blue-500 font-medium">Loading...</p>
          </div>
        </div>
      )}


      <Toaster position="top-center" reverseOrder={false} />
      {showLogin && <Login />}
      <Sidebar />

      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/user" element={<UserAccount />} />
      </Routes>

      
    </div>
  );
}

export default App;
