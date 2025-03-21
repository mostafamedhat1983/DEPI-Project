import { create } from 'zustand';
import { CartItem, Product, AuthState, WishlistItem, Order, CompareProduct, Review } from '../types';
import { products as initialProducts } from '../data/products';
import {  OrderDB, ReviewDB } from '../database/db';
import {SERVER_IP} from '../env'
interface Currency {
    code: string;
    symbol: string;
    rate: number;
}

interface Filters {
    search: string;
    category: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
    sortBy: string;
}

interface Store {
    // Products
    products: Product[];
    filteredProducts: Product[];
    filters: Filters;
    setFilters: (filters: Partial<Filters>) => void;
    updateProductStock: (productId: string, quantity: number) => void;

    // Cart
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;

    // Wishlist
    wishlist: WishlistItem[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;

    // Compare
    compareProducts: CompareProduct[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (productId: string) => void;
    isInCompare: (productId: string) => boolean;
    clearCompare: () => void;

    // Orders
    orders: Order[];
    createOrder: (shippingAddress: Order['shippingAddress'], paymentMethod: Order['paymentMethod']) => Promise<void>;
    getOrders: () => Promise<Order[]>;

    // Auth
    auth: AuthState;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;

    // Currency
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatPrice: (price: number) => string;

    // Reviews
    reviews: Review[];
    addReview: (review: Omit<Review, 'id'>) => Promise<void>;
    getProductReviews: (productId: string) => Promise<Review[]>;
}

export const useStore = create<Store>((set, get) => ({
    // Products
    products: initialProducts,
    filteredProducts: initialProducts,
    filters: {
	search: '',
	category: '',
	brand: '',
	minPrice: 0,
	maxPrice: Number.MAX_SAFE_INTEGER,
	sortBy: '',
    },
    setFilters: (newFilters) => {
	const currentFilters = get().filters;
	const updatedFilters = { ...currentFilters, ...newFilters };
	
	set((state) => {
	    let filtered = state.products.filter((product) => {
		const matchesSearch = product.name.toLowerCase().includes(updatedFilters.search.toLowerCase()) ||
                    product.description.toLowerCase().includes(updatedFilters.search.toLowerCase());
		const matchesCategory = !updatedFilters.category || product.category === updatedFilters.category;
		const matchesBrand = !updatedFilters.brand || product.brand === updatedFilters.brand;
		const matchesPrice = product.price >= updatedFilters.minPrice &&
                    (!updatedFilters.maxPrice || product.price <= updatedFilters.maxPrice);

		return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
	    });

	    if (updatedFilters.sortBy) {
		filtered = [...filtered].sort((a, b) => {
		    switch (updatedFilters.sortBy) {
			case 'price-asc':
			    return a.price - b.price;
			case 'price-desc':
			    return b.price - a.price;
			case 'name-asc':
			    return a.name.localeCompare(b.name);
			case 'name-desc':
			    return b.name.localeCompare(a.name);
			default:
			    return 0;
		    }
		});
	    }

	    return {
		filters: updatedFilters,
		filteredProducts: filtered,
	    };
	});
    },
    updateProductStock: (productId: string, quantity: number) => {
	set((state) => ({
	    products: state.products.map((product) =>
		product.id === productId
		? { ...product, stock: Math.max(0, product.stock - quantity) }
		: product
					),
	    filteredProducts: state.filteredProducts.map((product) =>
		product.id === productId
		? { ...product, stock: Math.max(0, product.stock - quantity) }
		: product
							),
	}));
    },

    // Cart
    cart: [],
    addToCart: (product) => {
	if (product.stock === 0) return;
	
	set((state) => {
	    const existingItem = state.cart.find((item) => item.id === product.id);
	    if (existingItem) {
		if (existingItem.quantity >= product.stock) {
		    return state;
		}
		return {
		    cart: state.cart.map((item) =>
			item.id === product.id
			? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
			: item
					),
		};
	    }
	    return {
		cart: [...state.cart, { ...product, quantity: 1 }],
	    };
	});
    },
    removeFromCart: (productId) => {
	set((state) => ({
	    cart: state.cart.filter((item) => item.id !== productId),
	}));
    },
    updateQuantity: (productId, quantity) => {
	const product = get().products.find((p) => p.id === productId);
	if (!product) return;

	set((state) => ({
	    cart: quantity === 0
		? state.cart.filter((item) => item.id !== productId)
		: state.cart.map((item) =>
		    item.id === productId 
		    ? { ...item, quantity: Math.min(quantity, product.stock) }
		    : item
				),
	}));
    },
    clearCart: () => set({ cart: [] }),

    // Wishlist
    wishlist: [],
    addToWishlist: (product) => {
	set((state) => ({
	    wishlist: [...state.wishlist, { ...product, addedAt: new Date().toISOString() }],
	}));
    },
    removeFromWishlist: (productId) => {
	set((state) => ({
	    wishlist: state.wishlist.filter((item) => item.id !== productId),
	}));
    },
    isInWishlist: (productId) => {
	return get().wishlist.some((item) => item.id === productId);
    },

    // Compare
    compareProducts: [],
    addToCompare: (product) => {
	set((state) => ({
	    compareProducts: [...state.compareProducts, { ...product, addedAt: new Date().toISOString() }],
	}));
    },
    removeFromCompare: (productId) => {
	set((state) => ({
	    compareProducts: state.compareProducts.filter((item) => item.id !== productId),
	}));
    },
    isInCompare: (productId) => {
	return get().compareProducts.some((item) => item.id === productId);
    },
    clearCompare: () => set({ compareProducts: [] }),

    // Orders
    orders: [],
    createOrder: async (shippingAddress, paymentMethod) => {
	const { cart, auth, updateProductStock } = get();
	if (!auth.user) throw new Error('User not authenticated');

	// Check if all items are in stock
	for (const item of cart) {
	    const product = get().products.find(p => p.id === item.id);
	    if (!product || product.stock < item.quantity) {
		throw new Error(`${item.name} is out of stock`);
	    }
	}

	const order = await OrderDB.create({
	    userId: auth.user.id,
	    items: cart.map((item) => ({
		...item,
		price: item.price,
	    })),
	    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
	    status: 'processing',
	    shippingAddress,
	    paymentMethod,
	});

	if (order) {
	    // Update stock for each item
	    cart.forEach((item) => {
		updateProductStock(item.id, item.quantity);
	    });

	    set((state) => ({
		orders: [...state.orders, order],
		cart: [], // Clear the cart after successful order
	    }));
	}
    },
    getOrders: async () => {
	const { auth } = get();
	if (!auth.user) return [];
	const orders = await OrderDB.findByUser(auth.user.id);
	set({ orders }); // Update the orders in the store
	return orders;
    },

    // Auth
    auth: {
	user: null,
	isLoading: false,
	error: null,
    },
    login: async (email, password) => {
	set({ auth: { ...get().auth, isLoading: true, error: null } });
	try {
	    const response = await fetch(`${SERVER_IP}/users/search/findOneByEmail?email=${email}`);
	    if(!response.ok) {
		throw new Error(`Error! ${response.status}, user not found`);
	    }
	    
	    const user = await response.json();
	    console.log(user);
	    if(user.password == password) {
		set({ 
		      auth: { 
		        user: { id: user.id, email: user.email, name: user.name }, 
		          isLoading: false, 
		          error: null 
		      } 
		});
	    }else {
		throw new Error("wrong email or password, please try again");

	    }

	} catch (error) {
	    set({ auth: { user: null, isLoading: false, error: (error as Error).message } });
	    throw error;
	}
    },
    signup: async (email, password, name) => {
	
	set({ auth: { ...get().auth, isLoading: true, error: null } });
	const checkIfUserExists = await fetch(`${SERVER_IP}/users/search/findOneByEmail?email=${email}`);
	if(checkIfUserExists.status != 404) {
	    throw new Error("failed");
	}

	try {
	    const response = await fetch(`${SERVER_IP}/users`, {
		method: 'POST',
		headers: {
                    'Content-Type': 'application/json',
		},
		body: JSON.stringify({
                    email,
                    password,
                    name,
		}),
            });

            if (!response.ok) {
		throw new Error(`Failed to sign up: ${response.statusText}`);
            }

	    const user = await response.json();
	    
	    set({ 
		auth: { 
		    user: { id: user.id, email: user.email, name: user.name }, 
		    isLoading: false, 
		    error: null 
		} 
	    });
	} catch (error) {
	    set({ auth: { user: null, isLoading: false, error: (error as Error).message } });
	    throw error;
	}
    },
    logout: () => {
	set({ auth: { user: null, isLoading: false, error: null } });
    },

    // Currency
    currency: { code: 'USD', symbol: '$', rate: 1 },
    setCurrency: (newCurrency) => {
	set({ currency: newCurrency });
	window.dispatchEvent(new Event('currency-update'));
    },
    formatPrice: (price) => {
	const { currency } = get();
	const convertedPrice = price * currency.rate;
	return `${currency.symbol}${convertedPrice.toFixed(2)}`;
    },

    // Reviews
    reviews: [],
    addReview: async (review) => {
	try {
	    const newReview = await ReviewDB.create(review);
	    if (newReview) {
		set((state) => ({
		    reviews: [...state.reviews, newReview],
		}));
	    }
	} catch (error) {
	    console.error('Failed to add review:', error);
	    throw error;
	}
    },
    getProductReviews: async (productId) => {
	try {
	    const reviews = await ReviewDB.findByProduct(productId);
	    return reviews;
	} catch (error) {
	    console.error('Failed to get product reviews:', error);
	    return [];
	}
    },
}));
