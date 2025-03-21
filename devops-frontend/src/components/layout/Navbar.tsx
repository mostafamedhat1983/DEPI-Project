import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Home, Package, Heart, ClipboardList } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { SearchBar } from '../Search/SearchBar';
import { CurrencySelector } from './CurrencySelector';

export const Navbar: React.FC = () => {
  const { cart, auth, logout } = useStore((state) => ({
    cart: state.cart,
    auth: state.auth,
    logout: state.logout,
  }));
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-1">
            <Link to="/" className="flex items-center space-x-2">
              <Package className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-xl">TestShop</span>
            </Link>
            <div className="ml-8 flex-1 max-w-xl">
              <SearchBar />
            </div>
            <CurrencySelector />
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
                location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'
              }`}
              data-testid="home-link"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>

            <Link
              to="/wishlist"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
                location.pathname === '/wishlist' ? 'text-blue-600' : 'text-gray-600'
              }`}
              data-testid="wishlist-link"
            >
              <Heart className="w-5 h-5" />
              <span>Wishlist</span>
            </Link>

            {auth.user && (
              <Link
                to="/orders"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
                  location.pathname === '/orders' ? 'text-blue-600' : 'text-gray-600'
                }`}
                data-testid="orders-link"
              >
                <ClipboardList className="w-5 h-5" />
                <span>Orders</span>
              </Link>
            )}

            <Link
              to="/cart"
              className="flex items-center space-x-1 px-3 py-2 rounded-md relative"
              data-testid="cart-link"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {auth.user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {auth.user.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  data-testid="logout-button"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" data-testid="login-link">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};