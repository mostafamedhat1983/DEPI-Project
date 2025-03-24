import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Order } from '../../types';

const StatusIcon = ({ status }: { status: Order['status'] }) => {
  switch (status) {
    case 'processing':
      return <Clock className="w-5 h-5 text-blue-500" />;
    case 'shipped':
      return <Truck className="w-5 h-5 text-orange-500" />;
    case 'delivered':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'cancelled':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Package className="w-5 h-5 text-gray-500" />;
  }
};

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const colors = {
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-orange-100 text-orange-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    pending: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      <StatusIcon status={status} />
      <span className="ml-1 capitalize">{status}</span>
    </span>
  );
};

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { auth, getOrders } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (!auth.user) {
        navigate('/login?redirect=/orders');
        return;
      }

      try {
        const userOrders = await getOrders();
        setOrders(userOrders);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [auth.user, getOrders, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!auth.user) {
    return null;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Orders Yet</h2>
        <p className="text-gray-500 mb-4">Start shopping to create your first order!</p>
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-800 font-medium"
          data-testid="start-shopping-button"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-sm p-6"
            data-testid={`order-${order.id}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500" data-testid={`order-date-${order.id}`}>
                  Ordered on {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm font-medium" data-testid={`order-id-${order.id}`}>
                  Order #{order.id}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div className="border-t border-gray-200 pt-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center py-2"
                  data-testid={`order-item-${order.id}-${item.id}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Shipping Address:</p>
                  <p className="text-sm">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p className="text-sm">
                    {order.shippingAddress.address}
                  </p>
                  <p className="text-sm">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount:</p>
                  <p className="text-xl font-bold" data-testid={`order-total-${order.id}`}>
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};