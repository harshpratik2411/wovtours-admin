import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; 
import { AlertProvider } from "./Context/AlertContext/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode> 
    <AlertProvider>
    <BrowserRouter> 
        <App />
    </BrowserRouter>
    </AlertProvider>
  </React.StrictMode>
);
