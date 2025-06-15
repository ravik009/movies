
import React from 'react';
import { Genre, ALL_GENRES } from '../types';

interface GenrePillsProps {
  selectedGenre: Genre | 'All';
  onGenreSelect: (genre: Genre | 'All') => void;
}

const GenrePills: React.FC<GenrePillsProps> = ({ selectedGenre, onGenreSelect }) => {
  const genresToDisplay: (Genre | 'All')[] = ['All', ...ALL_GENRES];

  return (
    <div className="px-4 md:px-6 lg:px-8 py-3 flex space-x-2 overflow-x-auto scrollbar-hide">
      {genresToDisplay.map((genre) => (
        <button
          key={genre}
          onClick={() => onGenreSelect(genre)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap
            ${selectedGenre === genre 
              ? 'bg-red-600 text-white' 
              : 'bg-zinc-700 hover:bg-zinc-600 text-gray-300 hover:text-white'
            }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenrePills;
