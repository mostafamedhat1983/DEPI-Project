import React from 'react';
import { useStore } from '../../store/useStore';
import { useCurrency } from '../../hooks/useCurrency';

export const OrderSummary: React.FC = () => {
  const { cart } = useStore();
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const formattedSubtotal = useCurrency(subtotal);
  const formattedShipping = useCurrency(shipping);
  const formattedTax = useCurrency(tax);
  const formattedTotal = useCurrency(total);

  return (
    <div className="bg-gray-50 rounded-lg p-6" data-testid="order-summary">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        {cart.map((item) => {
          const itemTotal = item.price * item.quantity;
          const formattedPrice = useCurrency(itemTotal);

          return (
            <div
              key={item.id}
              className="flex justify-between py-2"
              data-testid={`summary-item-${item.id}`}
            >
              <div className="flex items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                  data-testid={`summary-image-${item.id}`}
                />
                <div className="ml-4">
                  <h3 className="font-medium" data-testid={`summary-name-${item.id}`}>
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500" data-testid={`summary-quantity-${item.id}`}>
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <span className="font-medium" data-testid={`summary-price-${item.id}`}>
                {formattedPrice}
              </span>
            </div>
          );
        })}

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span data-testid="summary-subtotal">{formattedSubtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span data-testid="summary-shipping">{formattedShipping}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (10%)</span>
            <span data-testid="summary-tax">{formattedTax}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span data-testid="summary-total">{formattedTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};