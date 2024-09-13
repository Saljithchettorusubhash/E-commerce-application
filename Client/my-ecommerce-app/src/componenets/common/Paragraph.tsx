import React from 'react';

interface ParagraphProps {
  text: string;
  color?: string;  // Allow passing color
  fontSize?: string; // Add this line

}

const Paragraph: React.FC<ParagraphProps> = ({ text, color = 'gray' }) => {
  return (
    <p
      style={{ color }} // Use passed color or fallback to default
      className="text-base leading-7"
    >
      {text}
    </p>
  );
};

export default Paragraph;
