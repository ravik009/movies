
import React from 'react';
import { SearchIcon, BellIcon, UserIcon } from './icons';

interface HeaderProps {
  onSearchClick?: () => void; // Optional: To handle search icon click
}

const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const navItems = ["Home", "Movies", "Series", "My List"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/50 to-transparent transition-all duration-300">
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-bold text-red-600 cursor-pointer" onClick={() => window.location.reload()}>MOVIE TIME</h1>
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={`text-sm font-medium hover:text-gray-300 transition-colors ${index === 0 ? 'text-white font-semibold' : 'text-gray-400'}`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={onSearchClick} className="text-white hover:text-gray-300 transition-colors">
          <SearchIcon className="w-5 h-5" />
        </button>
        <button className="text-white hover:text-gray-300 transition-colors">
          <BellIcon className="w-5 h-5" />
        </button>
        <button className="text-white hover:text-gray-300 transition-colors">
          <UserIcon className="w-6 h-6 rounded-full" />
        </button>
      </div>
    </header>
  );
};

export default Header;
