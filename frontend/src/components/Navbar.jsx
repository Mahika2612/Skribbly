import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNewNote = () => {
    navigate("/create");
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6 py-4 animate-fade-in-down">
      <div className="flex-1">
        <a className="text-2xl font-bold text-yellow-500 hover:text-yellow-600 transition-all duration-300">
          🐾 Skribbly
        </a>
      </div>
      <div className="flex-none">
        <button
          onClick={handleNewNote}
          className="btn btn-warning btn-sm rounded-full shadow hover:scale-105 transition-transform duration-200"
        >
          New Note
        </button>
      </div>
    </div>
  );
};

export default Navbar;
