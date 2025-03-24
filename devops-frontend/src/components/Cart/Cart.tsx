import React from 'react';
import { useStore } from '../../store/useStore';
import { EmptyCart } from './EmptyCart';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow p-6" data-testid="cart">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
        <CartSummary total={total} />
      </div>
    </div>
  );
};