import { useState } from "react";
import logo from "../assets/logo.png";
import { SunMedium, Moon, UserRound, X, Menu, LogOut, LogIn } from "lucide-react";
import { useAppContext } from "../Context/AppContext";

const Sidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme, user, setShowLogin, logout } = useAppContext();

  return (
    <>
      {/* Hamburger button*/}
      {!isMenuOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md  backdrop-blur  text-blue-700 dark:text-blue-400"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={40} />
        </button>
      )}

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-10  backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`flex flex-col justify-between h-screen w-72 shrink-0 p-5 
          dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 
          border-r border-[#80609f]/30 backdrop-blur-3xl 
          transition-transform duration-300 
          max-md:fixed left-0 top-0 z-20  
          ${!isMenuOpen ? "max-md:-translate-x-full" : "max-md:translate-x-0"}`}
      >
        {/* Top Section */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-6">
            <img src={logo} alt="Notely Logo" className="w-10 h-10" />
            <span className="text-3xl font-bold tracking-tight text-blue-600">
              NOTELY
            </span>
          </div>

          {/* Buttons */}
          <div>

          </div>
        </div>

        {/* Bottom Section */}
        <div>
          {/* Toggle theme */}
          <div className="flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md dark:text-gray-100">
            <div className="flex items-center gap-2 text-sm">
              {theme === "dark" ? <Moon /> : <SunMedium />}
              <p className="select-none">
                Color Mode {theme === "dark" ? "( Dark )" : "( Light )"}
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-blue-600 transition-all" />
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
            </label>
          </div>

          {/* User Account */}
          <div className="flex flex-row items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md ">
            {user ? (
              <div className="flex flex-row w-full justify-between items-center ">
                <div className="flex flex-row items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                    <UserRound size={30} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-900 dark:text-gray-200 font-semibold overflow-x-hidden">
                      {user.name}
                    </p>
                  </div>
                </div>

                <div
                  className=" text-gray-700 dark:text-gray-200 hover:scale-115  duration-300"
                  onClick={logout}
                >
                  <LogOut />
                </div>
              </div>
            ) : (
              <div
                className="flex flex-row gap-3 hover:scale-110 duration-300 cursor-pointer"
                onClick={() => setShowLogin(true)}
              >
                <div className=" text-gray-700 dark:text-gray-200   ">
                  <LogIn />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-900 dark:text-gray-200 font-semibold overflow-x-hidden">
                    Log In
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Close button  */}
        <button
          className="absolute top-4 right-3 md:hidden text-gray-900  dark:text-gray-200"
          onClick={() => setIsMenuOpen(false)}
        >
          <X size={30} />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
