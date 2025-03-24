import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowUpDown } from 'lucide-react';

export const ProductSort: React.FC = () => {
  const { setFilters } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6" data-testid="product-sort">
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Sort By
        </label>
        <select
          onChange={(e) => setFilters({ sortBy: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="sort-select"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
};