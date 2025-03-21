import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export const PaymentForm: React.FC = () => {
  const navigate = useNavigate();
  const { createOrder, clearCart } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {};
    
    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!formData.cardHolder.match(/^[a-zA-Z\s]{2,}$/)) {
      newErrors.cardHolder = 'Invalid card holder name';
    }
    
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }
    
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19);
  };

  const formatExpiryDate = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return `${digits.substr(0, 2)}/${digits.substr(2, 2)}`;
    }
    return digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create order with shipping and payment info
      await createOrder(
        // Get shipping info from localStorage (saved in ShippingForm)
        JSON.parse(localStorage.getItem('shippingAddress') || '{}'),
        {
          cardNumber: formData.cardNumber,
          cardHolder: formData.cardHolder
        }
      );
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/checkout/success');
    } catch (error) {
      setErrors({ cardNumber: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6" data-testid="payment-form">
      <h2 className="text-xl font-semibold mb-6">Payment Details</h2>

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p className="text-sm text-blue-800">
          <strong>Test Card Details:</strong><br />
          Card Number: 4242 4242 4242 4242<br />
          Expiry: Any future date<br />
          CVV: Any 3 digits
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Card Number"
          value={formData.cardNumber}
          onChange={(e) => setFormData({
            ...formData,
            cardNumber: formatCardNumber(e.target.value)
          })}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          error={errors.cardNumber}
          data-testid="card-number-input"
        />

        <Input
          label="Card Holder Name"
          value={formData.cardHolder}
          onChange={(e) => setFormData({
            ...formData,
            cardHolder: e.target.value.toUpperCase()
          })}
          placeholder="JOHN DOE"
          error={errors.cardHolder}
          data-testid="card-holder-input"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry Date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({
              ...formData,
              expiryDate: formatExpiryDate(e.target.value)
            })}
            placeholder="MM/YY"
            maxLength={5}
            error={errors.expiryDate}
            data-testid="expiry-date-input"
          />

          <Input
            label="CVV"
            value={formData.cvv}
            onChange={(e) => setFormData({
              ...formData,
              cvv: e.target.value.replace(/\D/g, '').substr(0, 4)
            })}
            type="password"
            placeholder="123"
            maxLength={4}
            error={errors.cvv}
            data-testid="cvv-input"
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-6"
          isLoading={isProcessing}
          data-testid="submit-payment"
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </Button>
      </form>
    </div>
  );
};