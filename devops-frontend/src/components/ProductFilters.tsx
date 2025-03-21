import React from 'react';
import { useStore } from '../store/useStore';
import { Search } from 'lucide-react';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'food', label: 'Food & Beverages' },
  { value: 'sports', label: 'Sports & Fitness' }
];

const brands = [
  { value: '', label: 'All Brands' },
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' },
  { value: 'nike', label: 'Nike' },
  { value: 'harriman', label: 'Harriman House' },
  { value: 'organic-foods', label: 'Organic Foods' },
  { value: 'fitness-gear', label: 'Fitness Gear' }
];

export const ProductFilters: React.FC = () => {
  const { filters, setFilters } = useStore();

  const handlePriceChange = (type: 'minPrice' | 'maxPrice', value: string) => {
    const numValue = value === '' ? (type === 'minPrice' ? 0 : Number.MAX_SAFE_INTEGER) : Number(value);
    setFilters({ [type]: numValue });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6" data-testid="product-filters">
      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Search Products</label>
        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search..."
            data-testid="search-input"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Price Range</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              data-testid="min-price-input"
            />
          </div>
          <div>
            <input
              type="number"
              value={filters.maxPrice === Number.MAX_SAFE_INTEGER ? '' : filters.maxPrice}
              onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              data-testid="max-price-input"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="category-select"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => setFilters({ brand: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="brand-select"
        >
          {brands.map((brand) => (
            <option key={brand.value} value={brand.value}>
              {brand.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => setFilters({
          search: '',
          category: '',
          brand: '',
          minPrice: 0,
          maxPrice: Number.MAX_SAFE_INTEGER
        })}
        className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        data-testid="reset-filters"
      >
        Reset Filters
      </button>
    </div>
  );
};