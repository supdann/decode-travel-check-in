// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import palmbackgound from "./assets/palm_bg.webp";
import "./App.css";
import ButtonStandart from "./components/ButtonStandart";
import happylegs from "./assets/happy_legs.png";
import happyhead from "./assets/happy_head.png";
import ProgressBar from "./components/ProgressBar";


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
      padding: "100px",
      color: "var(--primary-dark)",
    }}>
        <ButtonStandart onClick={() => navigate("/login")} text="Donate" 
        style={{
           width: '300px', 
           height:"90px", 
           borderRadius: "50px", 
           backgroundColor: 'var(--primary-color)', 
           fontSize: "24px",
           }}>
        </ButtonStandart>
        <Stack sx={{
          position: "relative",
          }}>
            <img src={happyhead} className="mascot" style={{ position: "relative", zIndex: "2" }}/>
            <img src={happylegs} style={{ position: "absolute", zIndex: "1" }}/>
      </Stack>

    <ProgressBar />
          
    </Stack>
  );
}

export default App;
