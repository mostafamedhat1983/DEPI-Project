import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from './ui/Button';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedTotal = useCurrency(total);

  // Render empty cart state
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center p-8 bg-white rounded-lg shadow" data-testid="empty-cart">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button onClick={() => navigate('/')} data-testid="continue-shopping">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  // Render cart with items
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow p-6" data-testid="cart">
        {cart.map((item) => {
          const itemTotal = item.price * item.quantity;
          const formattedPrice = useCurrency(item.price);
          const formattedItemTotal = useCurrency(itemTotal);

          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 border-b last:border-b-0"
              data-testid={`cart-item-${item.id}`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500">{formattedPrice}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    data-testid={`decrease-quantity-${item.id}`}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center" data-testid={`quantity-${item.id}`}>
                    {item.quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    data-testid={`increase-quantity-${item.id}`}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="font-medium min-w-[100px] text-right">
                  {formattedItemTotal}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                  data-testid={`remove-item-${item.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
        
        <div className="mt-6 flex flex-col items-end">
          <p className="text-lg font-bold mb-4" data-testid="cart-total">
            Total: {formattedTotal}
          </p>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              data-testid="continue-shopping"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => navigate('/checkout')}
              data-testid="checkout-button"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};