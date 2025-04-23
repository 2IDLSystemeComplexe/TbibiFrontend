import React from 'react';

const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <div className="text-4xl">{icon}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      <div className="text-gray-500">{title}</div>
    </div>
  );
};

export default Card;