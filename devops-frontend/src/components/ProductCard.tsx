import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Button } from './ui/Button';
import { useStore } from '../store/useStore';
import { ShoppingCart, Heart, BarChart2 } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToCompare,
    removeFromCompare,
    isInCompare,
  } = useStore();

  const formattedPrice = useCurrency(product.price);
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      data-testid={`product-card-${product.id}`}
    >
      <Link to={`/product/${product.id}`} className="block relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform hover:scale-105"
          data-testid={`product-image-${product.id}`}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              inWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
            }}
            className={`p-2 rounded-full ${
              inWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
            } hover:scale-110 transition-transform`}
            data-testid={`wishlist-button-${product.id}`}
          >
            <Heart className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              inCompare ? removeFromCompare(product.id) : addToCompare(product);
            }}
            className={`p-2 rounded-full ${
              inCompare ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
            } hover:scale-110 transition-transform`}
            data-testid={`compare-button-${product.id}`}
          >
            <BarChart2 className="w-5 h-5" />
          </button>
        </div>
      </Link>
      <div className="p-4">
        <Link 
          to={`/product/${product.id}`}
          className="block group"
          data-testid={`product-link-${product.id}`}
        >
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 mb-2">{product.brand}</p>
          <p className="text-blue-600 font-bold mb-4">{formattedPrice}</p>
        </Link>
        <Button
          onClick={() => addToCart(product)}
          className="w-full"
          data-testid={`add-to-cart-${product.id}`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};