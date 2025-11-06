
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
                <span className="text-cyan-400">AI</span> Merch Mockup Generator
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
