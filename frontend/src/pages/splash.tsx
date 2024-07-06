import React from 'react';


const SplashPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-between items-center h-screen bg-cover bg-center text-white text-center">
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        <h1 className="text-5xl md:text-4xl sm:text-3xl mb-6">Welcome to Our Website</h1>
        <button className="text-xl md:text-lg sm:text-md px-6 py-3 bg-black bg-opacity-60 hover:bg-opacity-80 rounded transition duration-300">
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
