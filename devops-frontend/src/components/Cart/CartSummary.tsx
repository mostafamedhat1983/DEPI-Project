import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useCurrency } from '../../hooks/useCurrency';

interface CartSummaryProps {
  total: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ total }) => {
  const navigate = useNavigate();
  const formattedTotal = useCurrency(total);

  return (
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
  );
};