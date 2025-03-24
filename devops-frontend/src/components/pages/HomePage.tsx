import React from 'react';
import { useStore } from '../../store/useStore';
import { ProductCard } from '../ProductCard';
import { ProductFilters } from '../ProductFilters';
import { ProductSort } from '../ProductSort';

export const HomePage: React.FC = () => {
  const { filteredProducts } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <ProductFilters />
          <ProductSort />
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <p className="text-gray-600 mt-2">
              {filteredProducts.length} products found
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};