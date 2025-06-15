
import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onCardClick: (movie: Movie) => void; // Added onCardClick prop
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onCardClick }) => {
  const languageString = movie.genres.length > 0 
    ? movie.genres.slice(0, 2).join(', ') + (movie.genres.length > 2 ? '...' : '') 
    : 'Info not available';
  
  const qualityAndAudioPlaceholder = "1080p, 720p, 480p | Dual Audio";

  const handleClick = () => {
    onCardClick(movie); // Call the prop function
  };

  return (
    <div
      className="bg-zinc-800 rounded-md overflow-hidden shadow-lg cursor-pointer flex flex-col h-full transition-transform duration-200 ease-in-out hover:scale-105 group"
      onClick={handleClick}
      aria-label={`View details for ${movie.title}`}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick();}}
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-2 text-white flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1 truncate" title={movie.title}>
            {movie.title} ({movie.year})
          </h3>
          {movie.googleDriveLink && (
            <p className="text-[10px] sm:text-xs text-gray-300 mb-0.5 truncate">
              Full Movie Download
            </p>
          )}
          <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5 truncate" title={`${languageString} | ${qualityAndAudioPlaceholder}`}>
            {languageString}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-400 truncate" title={qualityAndAudioPlaceholder.split('|')[0].trim()}>
            {qualityAndAudioPlaceholder.split('|')[0].trim()} {/* Showing only quality for this line */}
          </p>
        </div>
        {movie.type === 'series' && (
          <p className="text-[10px] sm:text-xs text-gray-300 mt-1 truncate" title={movie.seasonEpisodeInfo || "All Episodes"}>
            {movie.seasonEpisodeInfo || "All Episodes"}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
