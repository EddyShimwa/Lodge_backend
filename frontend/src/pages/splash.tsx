import React from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/auth/signin');
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen bg-cover bg-center text-white text-center bg-[#1a222c]">
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        <h1 className="text-5xl md:text-6xl sm:text-3xl mb-6">Kal Palace</h1>
        <button  onClick={handleClick} className="text-xl md:text-lg sm:text-md px-6 py-3 bg-white text-[#1a222c] hover:bg-opacity-80 rounded transition duration-300">
          Continue
        </button>
      </div>
      <footer className="py-4 text-sm md:text-xs sm:text-xs">
        © 2024 Kal Palace. All rights reserved.
      </footer>
    </div>
  );
}

export default SplashPage;
