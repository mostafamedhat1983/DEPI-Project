import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';

export const useCurrency = (price: number): string => {
  const { formatPrice } = useStore();
  const [formattedPrice, setFormattedPrice] = useState(formatPrice(price));

  useEffect(() => {
    const updatePrice = () => {
      setFormattedPrice(formatPrice(price));
    };

    updatePrice();
    window.addEventListener('currency-update', updatePrice);
    return () => window.removeEventListener('currency-update', updatePrice);
  }, [price, formatPrice]);

  return formattedPrice;
};