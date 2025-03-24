import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ProductCard } from '../ProductCard';
import { ProductFilters } from '../ProductFilters';

export const CategoryPage: React.FC = () => {
  const { category, subcategory } = useParams();
  const { products } = useStore();

  const filteredProducts = products.filter(product => {
    if (subcategory) {
      // For subcategories like "phones" under "electronics"
      return product.category === category && product.subcategory === subcategory;
    }
    // For main categories like "electronics"
    return product.category === category;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize">
          {subcategory || category}
        </h1>
        <p className="text-gray-600 mt-2">
          {filteredProducts.length} products found
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ProductFilters />
        </div>
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};