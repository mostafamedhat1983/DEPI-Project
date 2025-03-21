import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../useStore';
import { products } from '../../data/products';

describe('useStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useStore());
    act(() => {
      result.current.clearCart();
      result.current.clearCompare();
      result.current.logout();
    });
  });

  describe('Cart functionality', () => {
    it('adds item to cart', () => {
      const { result } = renderHook(() => useStore());
      
      act(() => {
        result.current.addToCart(products[0]);
      });

      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0].id).toBe(products[0].id);
    });

    it('removes item from cart', () => {
      const { result } = renderHook(() => useStore());
      
      act(() => {
        result.current.addToCart(products[0]);
        result.current.removeFromCart(products[0].id);
      });

      expect(result.current.cart).toHaveLength(0);
    });

    it('updates item quantity', () => {
      const { result } = renderHook(() => useStore());
      
      act(() => {
        result.current.addToCart(products[0]);
        result.current.updateQuantity(products[0].id, 3);
      });

      expect(result.current.cart[0].quantity).toBe(3);
    });

    it('respects stock limits when adding to cart', () => {
      const { result } = renderHook(() => useStore());
      const product = { ...products[0], stock: 2 };
      
      act(() => {
        result.current.addToCart(product);
        result.current.updateQuantity(product.id, 3); // Try to add more than stock
      });

      expect(result.current.cart[0].quantity).toBe(2); // Should be limited to stock amount
    });
  });

  describe('Currency functionality', () => {
    it('formats price correctly', () => {
      const { result } = renderHook(() => useStore());
      const price = 99.99;
      
      expect(result.current.formatPrice(price)).toBe('$99.99');
      
      act(() => {
        result.current.setCurrency({ code: 'EUR', symbol: '€', rate: 0.92 });
      });
      
      expect(result.current.formatPrice(price)).toBe('€91.99');
    });
  });

  describe('Filter functionality', () => {
    it('filters products by search term', () => {
      const { result } = renderHook(() => useStore());
      
      act(() => {
        result.current.setFilters({ search: 'iPhone' });
      });

      expect(result.current.filteredProducts.every(p => 
        p.name.toLowerCase().includes('iphone') || 
        p.description.toLowerCase().includes('iphone')
      )).toBe(true);
    });

    it('filters products by price range', () => {
      const { result } = renderHook(() => useStore());
      
      act(() => {
        result.current.setFilters({ minPrice: 500, maxPrice: 1000 });
      });

      expect(result.current.filteredProducts.every(p => 
        p.price >= 500 && p.price <= 1000
      )).toBe(true);
    });
  });
});