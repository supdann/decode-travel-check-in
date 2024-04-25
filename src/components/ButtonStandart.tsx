import React from 'react';
import { Stack } from "@mui/material";
import '../styles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick: () => void;
}

const ButtonStandart: React.FC<ButtonProps> = ({ text, onClick, ...rest }) => {
    return (
        <Stack direction="row" spacing={2}>
            <button 
                className="round-button"  
                onClick={onClick} 
                style={{ backgroundColor: 'var(--primary-color)', borderRadius:"50px"}}
                {...rest} // Spread the rest of the props
            >
                {text}
            </button>
        </Stack>
    );
};

export default ButtonStandart;
