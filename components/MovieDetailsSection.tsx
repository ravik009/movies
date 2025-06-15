
import React from 'react';
import { Movie } from '../types';
import { PlayIcon, PlusIcon, StarIcon, DownloadIcon, CloseIcon } from './icons';

interface MovieDetailsSectionProps {
  movie: Movie | null;
  onClose: () => void;
  onPlay: (videoSrc: string, title: string) => void;
  onDownload: (googleDriveLink: string) => void;
}

const MovieDetailsSection: React.FC<MovieDetailsSectionProps> = ({ movie, onClose, onPlay, onDownload }) => {
  if (!movie) return null;

  const tabs = ["GENERAL INFORMATION", "WATCH TRAILER", "SIMILAR", "REVIEWS & DETAILS"];
  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  return (
    <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-zinc-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide relative text-white"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button 
            onClick={onClose} 
            className="absolute top-3 right-3 z-50 p-2 bg-black/50 hover:bg-red-600 rounded-full text-white transition-colors"
            aria-label="Close details"
        >
            <CloseIcon className="w-5 h-5" />
        </button>

        {/* Banner and Basic Info */}
        <div className="relative h-64 md:h-96">
          <img src={movie.bannerUrl} alt={movie.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8 z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-300 mb-3">
              {movie.ageRating && <span className="border border-gray-500 px-1.5 py-0.5 text-xs">{movie.ageRating}</span>}
              <span>{movie.duration}</span>
              <div className="flex items-center">
                <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
              <span>{movie.year}</span>
            </div>
            <div className="flex space-x-3">
              {/* "Watch" button removed from here */}
              <button 
                onClick={() => onDownload(movie.googleDriveLink)}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded text-sm transition-colors"
              >
                <DownloadIcon className="w-5 h-5 mr-2" />
                Download
              </button>
              <button className="flex items-center bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-4 py-2 rounded text-sm transition-colors">
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs and Content */}
        <div className="p-6 md:p-8">
          <div className="border-b border-zinc-700 mb-6">
            <nav className="flex space-x-6 -mb-px">
              {tabs.map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 border-b-2 text-sm font-medium transition-colors
                    ${activeTab === tab 
                      ? 'border-red-500 text-red-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "GENERAL INFORMATION" && (
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">{movie.longDescription || movie.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-100 mb-1">Genres:</h4>
                  <p className="text-gray-400">{movie.genres.join(', ')}</p>
                </div>
                 {movie.seasonEpisodeInfo && (
                  <div>
                    <h4 className="font-semibold text-gray-100 mb-1">Episode:</h4>
                    <p className="text-gray-400">{movie.seasonEpisodeInfo}</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === "WATCH TRAILER" && movie.trailerUrl && (
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={movie.trailerUrl} // onPlay is implicitly handled by iframe for trailer
                  title={`${movie.title} Trailer`}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-md"
                ></iframe>
              </div>
            )}
             {activeTab === "WATCH TRAILER" && !movie.trailerUrl && (
              <p className="text-gray-400">Trailer not available for this title.</p>
            )}
            {activeTab === "SIMILAR" && (
              <p className="text-gray-400">Similar movies functionality coming soon.</p>
            )}
            {activeTab === "REVIEWS & DETAILS" && (
              <p className="text-gray-400">Reviews and more details coming soon.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSection;
