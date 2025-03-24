import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ProductGallery } from '../product/ProductGallery';
import { ProductInfo } from '../product/ProductInfo';
import { RelatedProducts } from '../product/RelatedProducts';
import { ProductReviews } from '../product/ProductReviews';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products } = useStore();
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
      
      <div className="mb-12">
        <ProductReviews productId={product.id} />
      </div>
      
      <RelatedProducts
        currentProduct={product}
        category={product.category}
      />
    </div>
  );
};