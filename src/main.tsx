import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

// Providers
// import { SenderProvider } from "./context/SenderContext";

// MUI
import { CssBaseline } from "@mui/material";

// Pages
import "./init";
import App from "./App.tsx";
import RewardsPage from "./pages/Rewards.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <SenderProvider> */}
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    {/* </SenderProvider> */}
  </React.StrictMode>
);
