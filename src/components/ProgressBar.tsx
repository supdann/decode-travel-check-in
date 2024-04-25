import { Stack } from '@mui/material';
import React, { useState } from 'react';

const ProgressBar = () => {
  // State to control the progress value
  const [progress, setProgress] = useState(0);

  // Function to increment the progress
  const incrementProgress = () => {
    if (progress < 100) {
      setProgress(progress + 10); // Increase progress by 10%
    }
  };

  return (
    <Stack sx={{
        height: '20px',
    }}>
        <progress value={progress} max="100"></progress>
    </Stack>
  );
};

export default ProgressBar;
