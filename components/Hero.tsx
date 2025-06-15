
import React from 'react';
import { Movie } from '../types';
import { PlayIcon, PlusIcon, InfoIcon } from './icons';

interface HeroProps {
  movie: Movie | null;
  onPlay: (videoSrc: string, title: string) => void;
  onMoreInfo: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlay, onMoreInfo }) => {
  if (!movie) {
    return (
      <div className="h-[70vh] flex items-center justify-center bg-zinc-800">
        <p>Loading featured movie...</p>
      </div>
    );
  }

  return (
    <div 
      className="relative h-[85vh] md:h-[90vh] bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${movie.bannerUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      
      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-12 lg:p-16 space-y-4 md:space-y-6 pb-20 md:pb-24 lg:pb-32 max-w-2xl">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">{movie.title}</h2>
        {movie.seasonEpisodeInfo && (
          <p className="text-sm md:text-base text-gray-300 font-semibold">{movie.seasonEpisodeInfo}</p>
        )}
        <div className="flex items-center space-x-2 text-sm md:text-base text-gray-200">
          <span className="text-green-400 font-semibold">{movie.rating * 10}% Match</span> 
          <span>{movie.year}</span>
          {movie.ageRating && <span className="border border-gray-400 px-1 text-xs">{movie.ageRating}</span>}
          <span>{movie.duration}</span>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-gray-200 drop-shadow-md leading-relaxed max-w-xl line-clamp-3 md:line-clamp-4">
          {movie.description}
        </p>
        <div className="flex space-x-3 pt-2">
          <button 
            onClick={() => onPlay(movie.videoSrc, movie.title)}
            className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 md:px-8 md:py-3 rounded text-sm md:text-base transition-colors"
          >
            <PlayIcon className="w-5 h-5 md:w-6 md:h-6 mr-2" />
            Watch
          </button>
          <button 
            onClick={() => onMoreInfo(movie)}
            className="flex items-center justify-center bg-gray-600/70 hover:bg-gray-500/70 text-white font-semibold px-6 py-2 md:px-8 md:py-3 rounded text-sm md:text-base transition-colors backdrop-blur-sm"
          >
            <InfoIcon className="w-5 h-5 md:w-6 md:h-6 mr-2" />
            More Info
          </button>
           <button className="flex items-center justify-center bg-gray-600/70 hover:bg-gray-500/70 text-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded text-sm md:text-base transition-colors backdrop-blur-sm">
            <PlusIcon className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
