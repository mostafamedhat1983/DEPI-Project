import React from 'react';
import { ShoppingCart, Heart, BarChart2, Check } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';
import { EmailFriend } from './EmailFriend';
import { useCurrency } from '../../hooks/useCurrency';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
  } = useStore();

  const formattedPrice = useCurrency(product.price);
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  return (
    <div className="space-y-6" data-testid="product-info">
      <div>
        <h1 className="text-3xl font-bold text-gray-900" data-testid="product-name">
          {product.name}
        </h1>
        <p className="text-lg text-gray-500" data-testid="product-brand">
          {product.brand}
        </p>
      </div>

      <div className="flex items-baseline">
        <p className="text-3xl font-bold text-blue-600" data-testid="product-price">
          {formattedPrice}
        </p>
        {product.stock > 0 ? (
          <span className="ml-4 text-green-600 flex items-center">
            <Check className="w-4 h-4 mr-1" />
            In Stock
          </span>
        ) : (
          <span className="ml-4 text-red-600">Out of Stock</span>
        )}
      </div>

      <p className="text-gray-600" data-testid="product-description">
        {product.description}
      </p>

      <div className="flex space-x-4">
        <Button
          onClick={() => addToCart(product)}
          className="flex-1"
          data-testid="add-to-cart"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
        
        <Button
          variant="outline"
          onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
          data-testid="toggle-wishlist"
        >
          <Heart
            className="w-4 h-4"
            fill={inWishlist ? 'currentColor' : 'none'}
          />
        </Button>
        
        <Button
          variant="outline"
          onClick={() => addToCompare(product)}
          disabled={inCompare}
          data-testid="add-to-compare"
        >
          <BarChart2 className="w-4 h-4" />
        </Button>

        <EmailFriend
          productName={product.name}
          productUrl={window.location.href}
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Product Details</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">Category</dt>
            <dd className="text-sm font-medium capitalize">
              {product.category}
              {product.subcategory && ` - ${product.subcategory}`}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Brand</dt>
            <dd className="text-sm font-medium">{product.brand}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Stock</dt>
            <dd className="text-sm font-medium">{product.stock} units</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};