import React from 'react';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Heart className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500">Start adding items to your wishlist!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Wishlist ({wishlist.length} items)</h2>
      <div className="grid gap-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
            data-testid={`wishlist-item-${item.id}`}
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  Added on {new Date(item.addedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addToCart(item)}
                data-testid={`add-to-cart-${item.id}`}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeFromWishlist(item.id)}
                data-testid={`remove-from-wishlist-${item.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};