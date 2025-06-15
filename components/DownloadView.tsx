
import React from 'react';
import { Movie } from '../types';
import { ChevronLeftIcon, DownloadIcon, InfoIcon, StarIcon } from './icons'; // PlayIcon removed

interface DownloadViewProps {
  movie: Movie;
  onClose: () => void;
  // onPlayTrailer prop removed
  onDownload: (googleDriveLink: string) => void;
  onShowFullDetails: (movie: Movie) => void;
}

const DownloadView: React.FC<DownloadViewProps> = ({ movie, onClose, onDownload, onShowFullDetails }) => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white pt-20 md:pt-24 pb-10">
      <div className="fixed top-4 left-4 z-20 md:pt-16"> {/* Adjusted for header */}
         <button
          onClick={onClose}
          className="flex items-center bg-black/50 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors backdrop-blur-sm"
          aria-label="Back to browse"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      <div className="relative h-72 md:h-96 -mt-20 md:-mt-24"> {/* Negative margin to pull banner under header */}
        <img 
            src={movie.bannerUrl} 
            alt={`${movie.title} banner`} 
            className="w-full h-full object-cover opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8 -mt-24 md:-mt-32 relative z-10">
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/3 flex-shrink-0 mb-6 md:mb-0">
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="rounded-lg shadow-xl w-full max-w-xs mx-auto md:max-w-none aspect-[2/3] object-cover"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300 mb-4">
              <span>{movie.year}</span>
              <span className="border-l border-gray-600 pl-3">{movie.duration}</span>
              {movie.ageRating && <span className="border border-gray-500 px-1.5 py-0.5 text-xs rounded-sm">{movie.ageRating}</span>}
              <div className="flex items-center">
                <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-1">GENRES</h3>
              <p className="text-gray-200 text-sm">{movie.genres.join(', ')}</p>
            </div>

            {movie.seasonEpisodeInfo && (
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-400 mb-1">EPISODE</h3>
                    <p className="text-gray-200 text-sm">{movie.seasonEpisodeInfo}</p>
                </div>
            )}
            
            <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base line-clamp-5 md:line-clamp-none">
              {movie.longDescription || movie.description}
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => onDownload(movie.googleDriveLink)}
                className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md text-base transition-colors w-full sm:w-auto"
                aria-label={`Download ${movie.title}`}
              >
                <DownloadIcon className="w-5 h-5 mr-2" />
                Download Movie
              </button>
              {/* Play Trailer button removed */}
              <button
                onClick={() => onShowFullDetails(movie)}
                className="flex items-center justify-center bg-transparent border border-zinc-600 hover:bg-zinc-700 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-md text-base transition-colors w-full sm:w-auto"
                aria-label={`Show more information for ${movie.title}`}
              >
                <InfoIcon className="w-5 h-5 mr-2" />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadView;
