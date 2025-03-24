import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4" data-testid="success-title">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-2">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <p className="text-sm text-gray-500 mb-8" data-testid="order-number">
          Order Number: #{orderNumber}
        </p>
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/')}
            className="w-full"
            data-testid="continue-shopping-button"
          >
            Continue Shopping
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/orders')}
            className="w-full"
            data-testid="view-orders-button"
          >
            View Orders
          </Button>
        </div>
      </div>
    </div>
  );
};