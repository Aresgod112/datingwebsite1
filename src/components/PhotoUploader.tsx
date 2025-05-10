import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Camera } from 'lucide-react';

interface PhotoUploaderProps {
  initialPhotos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  initialPhotos = [],
  onPhotosChange,
  maxPhotos = 6,
}) => {
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // In a real app, you would upload these files to a server
    // For this demo, we'll just create object URLs
    const newPhotos = acceptedFiles.map(file => URL.createObjectURL(file));
    
    // Add new photos, but don't exceed maxPhotos
    const updatedPhotos = [...photos, ...newPhotos].slice(0, maxPhotos);
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  }, [photos, maxPhotos, onPhotosChange]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: maxPhotos - photos.length,
    disabled: photos.length >= maxPhotos,
  });
  
  const removePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {photos.map((photo, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={photo} 
              alt={`Photo ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70 focus:outline-none"
              aria-label="Remove photo"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        
        {photos.length < maxPhotos && (
          <div
            {...getRootProps()}
            className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer ${
              isDragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300 hover:border-pink-400'
            }`}
          >
            <input {...getInputProps()} />
            <Camera className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 text-center">
              {isDragActive ? 'Drop the files here' : 'Add photo'}
            </p>
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-500">
        {photos.length} of {maxPhotos} photos added
      </p>
    </div>
  );
};

export default PhotoUploader;
