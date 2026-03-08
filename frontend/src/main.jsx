import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import axios from "axios";
import { AppContextProvider } from './Context/AppContext.jsx';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </StrictMode>
  </BrowserRouter>,
);
