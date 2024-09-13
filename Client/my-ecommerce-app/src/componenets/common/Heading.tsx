import React from 'react';

interface HeadingProps {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: string;  // Allow passing color
  fontSize?: string; // Allow passing font size
}

const Heading: React.FC<HeadingProps> = ({ text, level = 1, color = 'black', fontSize }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      style={{ color, fontSize }} // Apply custom styles passed as props
      className={`font-bold ${fontSize ? '' : `text-${level * 2}xl`}`} // Default font-size if not passed
    >
      {text}
    </Tag>
  );
};

export default Heading;
