import React from 'react';
import { useStore } from '../../store/useStore';

const currencies = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'JPY', symbol: '¥', rate: 148.42 }
];

export const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useStore();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = currencies.find(c => c.code === e.target.value);
    if (selectedCurrency) {
      setCurrency(selectedCurrency);
    }
  };

  return (
    <select
      value={currency.code}
      onChange={handleCurrencyChange}
      className="ml-4 px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none cursor-pointer bg-white"
      data-testid="currency-selector"
    >
      {currencies.map((curr) => (
        <option key={curr.code} value={curr.code} data-testid={`currency-option-${curr.code}`}>
          {curr.code} ({curr.symbol})
        </option>
      ))}
    </select>
  );
};