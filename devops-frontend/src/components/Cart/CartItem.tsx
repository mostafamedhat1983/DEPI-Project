import React from 'react';
import { Button } from '../ui/Button';
import { Trash2, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCurrency } from '../../hooks/useCurrency';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const formattedPrice = useCurrency(item.price);
  const formattedTotal = useCurrency(item.price * item.quantity);

  return (
    <div
      className="flex items-center justify-between py-4 border-b last:border-b-0"
      data-testid={`cart-item-${item.id}`}
    >
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-gray-500">{formattedPrice}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
            data-testid={`decrease-quantity-${item.id}`}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-8 text-center" data-testid={`quantity-${item.id}`}>
            {item.quantity}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            data-testid={`increase-quantity-${item.id}`}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <p className="font-medium min-w-[100px] text-right">
          {formattedTotal}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRemove(item.id)}
          data-testid={`remove-item-${item.id}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};