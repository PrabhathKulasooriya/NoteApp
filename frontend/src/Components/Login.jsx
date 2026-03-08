import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import {useAppContext} from "../Context/AppContext.jsx";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login"); 
  const { setLoading, setShowLogin, setToken, setUser } = useAppContext();
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  //submit form
  const handleSubmit = async () => {
    //Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return toast.error("Please enter a valid email address");
    }
    //Register
    if (currentState === "Sign Up") {
      setLoading(true);
      try {
        const response = await axios.post("/api/user/create", {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        if (response.data.success) {
          setLoading(false);
          toast.success("User registered successfully!");
          setToken(response.data.token);
          setUser(response.data.user);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
        } else {
          setLoading(false);
          return toast.error(
            response.data.message || "Failed to register user",
          );
        }
      } catch (error) {
        console.log("Error registering user", error);
        setLoading(false);
        return toast.error(
          error.response.data.message || "Failed to register user",
        );
      }
    }

    //Login
    if (currentState === "Login") {
      setLoading(true);
      try {
        const response = await axios.post("/api/user/login", {
          email: data.email,
          password: data.password,
        });

        if (response.data.success) {
          setLoading(false);
          setToken(response.data.token);
          setUser(response.data.user);
          localStorage.setItem("token", response.data.token);
          toast.success("User logged in successfully!");
          setShowLogin(false);
        } else {
          setLoading(false);
          return toast.error(response.data.message || "Failed to login user");
        }
      } catch (error) {
        console.log("Error logging in user", error);
        setLoading(false);
        return toast.error(
          error.response.data.message || "Failed to login user",
        );
      }
    }
  };

    

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setdata({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="fixed inset-0 bg-[#00000090] backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Form Container */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            {currentState}
          </h2>

          
          <div className="space-y-4">
            {/* Name Field */}
            {currentState === "Sign Up" && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg mt-6"
            >
              {currentState === "Sign Up" ? "Create Account" : "Login"}
            </button>
          </div>

          {/* Toggle Between Login/Sign Up */}
          <div className="mt-6 text-center text-sm sm:text-base">
            <span className="text-gray-600">
              {currentState === "Sign Up"
                ? "Already have an account?"
                : "Don't have an account?"}
            </span>{" "}
            <button
              onClick={() => {
                setCurrentState(
                  currentState === "Sign Up" ? "Login" : "Sign Up",
                );
                setdata({
                  name: "",
                  email: "",
                  password: "",
                  terms: false,
                });
              }}
              className="text-blue-500 font-semibold hover:text-blue-600 hover:scale-105 transform transition-all duration-300 underline"
            >
              {currentState === "Sign Up" ? "Login here" : "Sign Up here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
