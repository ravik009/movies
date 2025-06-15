
import React from 'react';
import { CloseIcon } from './icons';

interface PlayerModalProps {
  isOpen: boolean;
  videoSrc: string;
  title: string;
  onClose: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ isOpen, videoSrc, title, onClose }) => {
  if (!isOpen) return null;

  const isYouTube = videoSrc.includes("youtube.com/embed");

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose} // Close when clicking backdrop
    >
      <div 
        className="bg-black rounded-lg shadow-2xl w-full max-w-3xl aspect-video relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video area
      >
        <button 
          onClick={onClose} 
          className="absolute -top-2 -right-2 md:top-2 md:right-2 z-10 p-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition-colors"
          aria-label="Close player"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
        {isYouTube ? (
          <iframe
            width="100%"
            height="100%"
            src={videoSrc}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        ) : (
          <video
            width="100%"
            height="100%"
            controls
            autoPlay
            src={videoSrc}
            className="rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default PlayerModal;
