import React from 'react';

const HeaderDashboard = ({ title }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-4">
        <span>👨‍⚕️ Dr. Azza</span>
        <img src="/user-avatar.png" alt="avatar" className="w-8 h-8 rounded-full" />
      </div>
    </header>
  );
};

export default HeaderDashboard;
