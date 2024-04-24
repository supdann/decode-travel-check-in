// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        background: "salmon",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Stack
        direction="row"
        sx={{
          height: "100px",
        }}
      >
        <Stack
          flex={1}
          sx={{
            background: "blue",
            height: "100px",
          }}
        ></Stack>

        <Stack
          flex={1}
          sx={{
            background: "yellow",
            height: "100px",
          }}
        ></Stack>
      </Stack>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <Button onClick={() => navigate("/rewards")}>REWARDS</Button>
    </Stack>
  );
}

export default App;
