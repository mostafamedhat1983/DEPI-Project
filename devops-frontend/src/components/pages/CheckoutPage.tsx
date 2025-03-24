import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ShippingForm } from '../checkout/ShippingForm';
import { PaymentForm } from '../checkout/PaymentForm';
import { OrderSummary } from '../checkout/OrderSummary';

type CheckoutStep = 'shipping' | 'payment';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, auth } = useStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!auth.user) {
      navigate('/login?redirect=/checkout');
    }
  }, [auth.user, navigate]);

  if (!auth.user) {
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some items to your cart to proceed with checkout</p>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 font-medium"
            data-testid="continue-shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8" data-testid="checkout-title">
        Checkout
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {currentStep === 'shipping' ? (
            <ShippingForm onComplete={() => setCurrentStep('payment')} />
          ) : (
            <PaymentForm />
          )}
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};