import React from 'react';
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import logo from "../assets/universal_logo.png";
import palmbackgound from "../assets/palm_bg.webp";
import happy from "../assets/happy.png";
import ButtonStandart from "../components/ButtonStandart";
import "../styles.css";

const LoginPage: React.FC = () => {
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
        width: "100vpw",
        color: "var(--primary-dark)",
        px: 2
      }}
    >
      <img src={logo} className="logo"/>
      <h1>No account yet?</h1>
      <ButtonStandart text="Create an Account" onClick={() => navigate("/rewards")} />
      <a href="#" style={{ paddingTop: '10px' }}>Login</a>
      <Stack sx={
        {
          position: "absolute",
          bottom: "-40vh",
          overflow: "hidden",
          height: "600px",
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          justifyContent: "center",
        }
      }>
        <img src={happy} className="mascot" alt="mascot"/>
      </Stack>
    </Stack>
  );
};

export default LoginPage;