import React from 'react';

const Button = ({ bgColor, color, size, text, borderRadius, type, onClick }) => {
  return (
    <button
      type={type} // Use the type prop here
      style={{ backgroundColor: bgColor, color: color, borderRadius }}
      className={`text-${size} p-3 hover:drop-shadow-xl`}
      onClick={onClick} // Pass the onClick prop here
    >
      {text}
    </button>
  );
};

export default Button;
