// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import logo from "./assets/universal_logo.png";
import palmbackgound from "./assets/palm_bg.webp";
import happy from "./assets/happy.png";
import "./App.css";
import ButtonStandart from "./components/ButtonStandart";

function App() {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        background: `url(${palmbackgound})`,
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        width: "100%",
        px: 1
      }}
    >
      <img src={logo} className="logo"/>
      <h1>No account yet?</h1>
      <ButtonStandart text="Create an Account" onClick={() => navigate("/rewards")} />
      Login
      <Stack sx={
        {
          position: "absolute",
          bottom: "-35vh",
          overflow: "hidden",
          height: "600px",
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          justifyContent: "center",
        }
      }>
        <img src={happy} className="mascot"/>
      </Stack>
    </Stack>
  );
}

export default App;
