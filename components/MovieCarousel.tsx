
import React, { useRef } from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  icon?: React.ReactNode;
  onMovieSelect: (movie: Movie) => void; 
  onPlay: (videoSrc: string, title: string) => void;
  onDownload: (googleDriveLink: string) => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies, icon, onMovieSelect, onPlay, onDownload }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8; // Scroll by 80% of visible width
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  
  if (!movies || movies.length === 0) {
    return null; // Don't render if no movies
  }

  return (
    <div className="py-6 md:py-8 lg:py-10 relative group/carousel">
      <div className="flex items-center mb-4 px-4 md:px-6 lg:px-8">
        {icon && <span className="mr-2 text-red-500">{icon}</span>}
        <h2 className="text-xl md:text-2xl font-semibold text-white">{title}</h2>
      </div>
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 ml-2 focus:outline-none"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-3 md:space-x-4 px-4 md:px-6 lg:px-8 pb-4 scrollbar-hide" // scrollbar-hide for custom scrollbar solution
        >
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onCardClick={onMovieSelect} // Restored this line
            />
          ))}
        </div>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 mr-2 focus:outline-none"
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;
