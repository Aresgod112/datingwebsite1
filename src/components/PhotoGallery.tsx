import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoGalleryProps {
  photos: string[];
  initialIndex?: number;
  onClose: () => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, photos.length]);
  
  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Close gallery"
      >
        <X size={24} />
      </button>
      
      <button
        onClick={goToPrevious}
        className="absolute left-4 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Previous photo"
      >
        <ChevronLeft size={36} />
      </button>
      
      <div className="max-w-3xl max-h-[80vh] relative">
        <img
          src={photos[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          className="max-w-full max-h-[80vh] object-contain"
        />
        <div className="absolute bottom-4 left-0 right-0 text-center text-white">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>
      
      <button
        onClick={goToNext}
        className="absolute right-4 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Next photo"
      >
        <ChevronRight size={36} />
      </button>
    </div>
  );
};

export default PhotoGallery;
