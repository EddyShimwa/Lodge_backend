import React from 'react';

const FullScreenLoader: React.FC = () => (
  <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full">
    <svg className="w-5 h-5 mr-3 text-blue-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
    Please wait...
  </div>
);

export default FullScreenLoader;