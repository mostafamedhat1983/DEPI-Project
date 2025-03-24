import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const CompareDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { compareProducts, removeFromCompare, clearCompare, formatPrice } = useStore();

  if (compareProducts.length === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50"
      data-testid="compare-drawer"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Compare Products ({compareProducts.length})
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={clearCompare}
            data-testid="clear-compare"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4">
          {compareProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-48 bg-gray-50 rounded-lg p-4 relative"
              data-testid={`compare-item-${product.id}`}
            >
              <button
                onClick={() => removeFromCompare(product.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                data-testid={`remove-compare-${product.id}`}
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h4 className="font-medium text-sm mb-1">{product.name}</h4>
              <p className="text-blue-600 font-bold text-sm">
                {formatPrice(product.price)}
              </p>
            </div>
          ))}
        </div>

        {compareProducts.length >= 2 && (
          <div className="flex justify-center">
            <Button
              onClick={() => navigate('/compare')}
              data-testid="view-comparison"
            >
              Compare Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};