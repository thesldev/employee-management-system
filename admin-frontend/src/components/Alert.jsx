import React from 'react';

const Alert = ({ type, message }) => {
  let bgColor;
  switch (type) {
    case 'success':
      bgColor = 'bg-green-500';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      break;
    case 'info':
      bgColor = 'bg-blue-500';
      break;
    case 'warning':
      bgColor = 'bg-orange-500';
      break;
    default:
      bgColor = 'bg-blue-500';
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 text-center py-2 ${bgColor} text-white`}>
      {message}
    </div>
  );
};

export default Alert;
