import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export const EmptyCart: React.FC = () => {
  const navigate = useNavigate();
  
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
};