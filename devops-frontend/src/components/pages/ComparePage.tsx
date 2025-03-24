import React from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ComparePage: React.FC = () => {
  const { compareProducts, removeFromCompare, clearCompare, formatPrice } = useStore();

  if (compareProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Compare Products</h1>
        <p className="text-gray-600 mb-4">No products to compare.</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Compare Products</h1>
        <Button variant="outline" onClick={clearCompare} data-testid="clear-all">
          Clear All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="p-4 text-left bg-gray-50">Feature</th>
              {compareProducts.map((product) => (
                <th key={product.id} className="p-4 text-left bg-gray-50 min-w-[250px]">
                  <div className="relative">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -top-2 -right-2 text-gray-400 hover:text-gray-600"
                      data-testid={`remove-${product.id}`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                    <Link
                      to={`/product/${product.id}`}
                      className="text-lg font-medium hover:text-blue-600"
                    >
                      {product.name}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border-t">Price</td>
              {compareProducts.map((product) => (
                <td key={product.id} className="p-4 border-t font-medium text-blue-600">
                  {formatPrice(product.price)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border-t">Brand</td>
              {compareProducts.map((product) => (
                <td key={product.id} className="p-4 border-t">
                  {product.brand}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border-t">Category</td>
              {compareProducts.map((product) => (
                <td key={product.id} className="p-4 border-t capitalize">
                  {product.category}
                  {product.subcategory && ` - ${product.subcategory}`}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border-t">Stock</td>
              {compareProducts.map((product) => (
                <td key={product.id} className="p-4 border-t">
                  {product.stock > 0 ? (
                    <span className="text-green-600 flex items-center">
                      <Check className="w-4 h-4 mr-1" />
                      In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border-t">Description</td>
              {compareProducts.map((product) => (
                <td key={product.id} className="p-4 border-t">
                  {product.description}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};