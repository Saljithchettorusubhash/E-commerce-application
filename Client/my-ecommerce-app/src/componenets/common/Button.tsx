import React from 'react';

interface ButtonProps {
  text: string;
  bgColor?: string;   // Allow passing background color
  textColor?: string; // Allow passing text color
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, bgColor = 'black', textColor = 'white', onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor }} // Use custom background and text colors
      className="px-6 py-2 rounded-full transition-colors duration-300"
    >
      {text}
    </button>
  );
};

export default Button;
