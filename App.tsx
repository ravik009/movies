
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import MovieDetailsSection from './components/MovieDetailsSection';
import GenrePills from './components/GenrePills';
import PlayerModal from './components/PlayerModal';
import MovieCard from './components/MovieCard';
import DownloadView from './components/DownloadView';
import { Movie, Genre } from './types';
import { MOCK_MOVIES } from './constants';
import { ClapperboardIcon } from './components/icons';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [activeGenre, setActiveGenre] = useState<Genre | 'All'>('All');
  
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [playerVideoSrc, setPlayerVideoSrc] = useState('');
  const [playerTitle, setPlayerTitle] = useState('');

  const [currentMainView, setCurrentMainView] = useState<'grid' | 'download'>('grid');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  // Removed isDirectDownloadView state

  // useEffect for URL param checking removed

  const handleMovieCardClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentMainView('download');
    window.scrollTo(0, 0); // Scroll to top for better UX
  }, []);

  const handleCloseDownloadView = useCallback(() => {
    setCurrentMainView('grid');
    setSelectedMovie(null);
     // Clear any URL parameters if they were somehow set
    if (window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleShowFullDetails = useCallback((movie: Movie) => {
    setSelectedMovie(movie); 
    setIsDetailsModalOpen(true);
  }, []);
  
  const handleCloseDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false);
    // If closing details modal from download view, keep selectedMovie for DownloadView
    // If we want to clear selectedMovie if not in download view, add logic here
  }, []);

  const handlePlay = useCallback((videoSrc: string, title: string) => {
    setPlayerVideoSrc(videoSrc);
    setPlayerTitle(title);
    setShowPlayerModal(true);
  }, []);

  const handleClosePlayer = useCallback(() => {
    setShowPlayerModal(false);
    setPlayerVideoSrc('');
    setPlayerTitle('');
  }, []);

  const handleDownload = useCallback((googleDriveLink: string) => {
    if (googleDriveLink) {
      window.open(googleDriveLink, '_blank', 'noopener,noreferrer');
    } else {
      alert("Download link is not available for this movie.");
    }
  }, []);
  
  const handleGenreSelect = useCallback((genre: Genre | 'All') => {
    setActiveGenre(genre);
    setCurrentMainView('grid'); 
    setSelectedMovie(null);
    // Clear any URL parameters if they were somehow set
    if (window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  
  const filteredMovies = useMemo(() => {
     if (activeGenre === 'All') {
        return movies; 
     }
     return movies.filter(movie => movie.genres.includes(activeGenre));
  }, [movies, activeGenre]);


  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      
      {currentMainView === 'grid' && (
        <main className="pt-20 md:pt-24 pb-10">
          <div className="my-4 md:my-6">
            <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 mb-3 md:mb-4">
               <div className="flex items-center">
                  <ClapperboardIcon className="w-5 h-5 md:w-6 md:h-6 mr-2 text-red-500" />
                  <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">
                    {activeGenre === 'All' ? 'All Content' : activeGenre}
                  </h2>
              </div>
            </div>
            <GenrePills selectedGenre={activeGenre} onGenreSelect={handleGenreSelect} />
          </div>

          <div className="px-4 md:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4 lg:gap-5">
            {filteredMovies.length > 0 ? (
              filteredMovies.map(movie => (
                  <MovieCard
                      key={movie.id}
                      movie={movie}
                      onCardClick={handleMovieCardClick} // Pass the click handler
                  />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 py-10">
                No movies found for the selected genre.
              </p>
            )}
          </div>
        </main>
      )}

      {currentMainView === 'download' && selectedMovie && (
        <DownloadView 
          movie={selectedMovie}
          onClose={handleCloseDownloadView} 
          onDownload={handleDownload}
          onShowFullDetails={handleShowFullDetails}
        />
      )}

      {isDetailsModalOpen && selectedMovie && (
        <MovieDetailsSection 
          movie={selectedMovie} 
          onClose={handleCloseDetailsModal}
          onPlay={handlePlay} 
          onDownload={handleDownload}
        />
      )}

      <PlayerModal 
        isOpen={showPlayerModal}
        videoSrc={playerVideoSrc}
        title={playerTitle}
        onClose={handleClosePlayer}
      />
      
      <footer className="py-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Movie Time. All rights reserved. For demonstration purposes only.
      </footer>
    </div>
  );
};

export default App;
