
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

// MUI
import { CssBaseline } from "@mui/material";

// Pages
import "./init"
import App from "./App.tsx";
import RewardsPage from "./pages/Rewards.tsx";
import AuthPage from "./pages/AuthPage.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
