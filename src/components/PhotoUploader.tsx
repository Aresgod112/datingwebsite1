import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

interface PhotoUploaderProps {
  maxPhotos?: number;
  onPhotosChange?: (photos: string[]) => void;
  initialPhotos?: string[];
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  maxPhotos = 6,
  onPhotosChange,
  initialPhotos = [],
}) => {
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (photos.length >= maxPhotos) return;
    
    setIsUploading(true);
    
    // Convert files to base64 strings (simulating upload)
    const promises = acceptedFiles.slice(0, maxPhotos - photos.length).map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            resolve(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(promises).then(newPhotos => {
      const updatedPhotos = [...photos, ...newPhotos];
      setPhotos(updatedPhotos);
      if (onPhotosChange) {
        onPhotosChange(updatedPhotos);
      }
      setIsUploading(false);
    });
  }, [photos, maxPhotos, onPhotosChange]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: maxPhotos - photos.length,
    disabled: photos.length >= maxPhotos || isUploading,
  });
  
  const removePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    if (onPhotosChange) {
      onPhotosChange(updatedPhotos);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={photo} 
              alt={`Uploaded photo ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        
        {photos.length < maxPhotos && (
          <div
            {...getRootProps()}
            className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300 hover:border-pink-400'
            } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 text-center">
              {isDragActive ? 'Drop the photo here' : 'Upload photo'}
            </p>
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-500">
        {photos.length} of {maxPhotos} photos uploaded
      </p>
    </div>
  );
};

export default PhotoUploader;
