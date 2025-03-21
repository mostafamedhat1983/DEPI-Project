import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface ShippingFormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

interface ShippingFormProps {
  onComplete: () => void;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<ShippingFormData>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Partial<ShippingFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingFormData> = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Save shipping info to localStorage for use in payment step
      localStorage.setItem('shippingAddress', JSON.stringify(formData));
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete();
    } catch (error) {
      setErrors({ address: 'Failed to save shipping information' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6" data-testid="shipping-form">
      <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            error={errors.firstName}
            required
            data-testid="firstname-input"
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            error={errors.lastName}
            required
            data-testid="lastname-input"
          />
        </div>

        <Input
          label="Street Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          error={errors.address}
          required
          data-testid="address-input"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            error={errors.city}
            required
            data-testid="city-input"
          />
          <Input
            label="State/Province"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            error={errors.state}
            required
            data-testid="state-input"
          />
          <Input
            label="Postal Code"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            error={errors.postalCode}
            required
            data-testid="postal-code-input"
          />
        </div>

        <Input
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
          required
          data-testid="phone-input"
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={isSubmitting}
          data-testid="submit-shipping"
        >
          Continue to Payment
        </Button>
      </form>
    </div>
  );
};