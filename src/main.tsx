import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

// MUI
import { CssBaseline } from "@mui/material";

// Pages
import App from "./App.tsx";
import RewardsPage from "./pages/Rewards.tsx";
import LoginPage from "./pages/LoginPage.tsx";

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
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
