export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  subcategory?: string;
  brand: string;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface WishlistItem extends Product {
  addedAt: string;
}

export interface OrderItem extends CartItem {
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: {
    cardNumber: string;
    cardHolder: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CompareProduct extends Product {
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}