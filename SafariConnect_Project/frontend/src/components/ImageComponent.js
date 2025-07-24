import React, { useState, useEffect } from 'react';

const ImageComponent = ({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc = "https://via.placeholder.com/400x300?text=Image+Not+Available",
  loading = "lazy",
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Reset state when src changes
  useEffect(() => {
    setImageSrc(src);
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
  }, [src]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    
    // Try fallback image if we haven't already
    if (retryCount === 0 && imageSrc !== fallbackSrc) {
      setRetryCount(1);
      setImageSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      // If fallback also fails, show placeholder
      setImageSrc("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3EImage unavailable%3C/text%3E%3C/svg%3E");
    }
  };

  // Preload image to check if it's accessible
  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      // If original image fails, try fallback immediately
      setImageSrc(fallbackSrc);
      setIsLoading(true);
    };
    img.src = src;
  }, [src, fallbackSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${hasError ? 'filter grayscale' : ''}`}
        {...props}
      />
      
      {hasError && !isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComponent; 