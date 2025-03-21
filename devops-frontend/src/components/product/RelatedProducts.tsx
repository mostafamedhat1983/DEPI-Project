import React from 'react';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import { useStore } from '../../store/useStore';

interface RelatedProductsProps {
  currentProduct: Product;
  category: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProduct,
  category,
}) => {
  const { products } = useStore();
  
  const relatedProducts = products
    .filter(p => p.category === category && p.id !== currentProduct.id)
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <div data-testid="related-products">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};