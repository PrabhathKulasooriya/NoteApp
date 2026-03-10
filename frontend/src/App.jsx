import {useState, useEffect} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainSection from "./pages/MainSection";
import Sidebar from "./Components/Sidebar";
import { useAppContext } from "./Context/AppContext";
import Login from "./Components/Login";
import Note from "./Components/Note";
import { Toaster } from "react-hot-toast";
import CollabNotes from "./pages/CollabNotes";

function App() {

  const location = useLocation();
  const { showLogin, loading, setLoading,} = useAppContext();
 

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
        <div className="fixed inset-0 bg-white dark:bg-slate-900 z-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="text-blue-500 font-medium">Loading...</p>
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
      {showLogin && <Login />}
      <Sidebar />

      <div className="flex-1 h-full overflow-hidden">
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/note/:id" element={<Note />} />
          <Route path="/shared" element={<CollabNotes />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
