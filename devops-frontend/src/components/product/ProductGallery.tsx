import React, { useState } from 'react';
import { Product } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  product: Product;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  // For demo purposes, create multiple views of the same image
  const images = [
    product.image,
    product.image.replace('w=400', 'w=401'),
    product.image.replace('w=400', 'w=402'),
  ];
  
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4" data-testid="product-gallery">
      <div className="relative">
        <img
          src={images[currentImage]}
          alt={product.name}
          className="w-full h-[500px] object-cover rounded-lg"
          data-testid="main-product-image"
        />
        
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          data-testid="prev-image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          data-testid="next-image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex space-x-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-1 ${currentImage === index ? 'ring-2 ring-blue-500' : ''}`}
            data-testid={`thumbnail-${index}`}
          >
            <img
              src={image}
              alt={`${product.name} view ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg"
            />
          </button>
        ))}
      </div>
    </div>
  );
};