import { Stack } from "@mui/material";
import { useState } from "react";

const ProgressBar = () => {
  // State to control the progress value
  const [progress] = useState(0);

  return (
    <Stack
      sx={{
        height: "20px",
      }}
    >
      <progress value={progress} max="100"></progress>
    </Stack>
  );
};

export default ProgressBar;
