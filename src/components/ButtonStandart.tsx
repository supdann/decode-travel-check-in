import React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const ButtonStandart: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button className="round-button" onClick={onClick}>
            {text}
        </button>
    );
};

export default ButtonStandart;