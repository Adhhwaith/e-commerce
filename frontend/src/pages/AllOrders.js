import React, { useState, useEffect } from 'react'
import SummaryApi from '../common'

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseText, setResponseText] = useState(''); // For debugging

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(SummaryApi.allOrders.url, {
        method: SummaryApi.allOrders.method,
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders || []);
        setError(null);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError(`Fetch error: ${err.message}`);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // For testing - create some dummy orders
  const loadDummyData = () => {
    const dummyOrders = [
      {
        _id: '1',
        userName: 'Test User',
        userEmail: 'test@example.com',
        productName: 'Test Product',
        productImage: 'https://via.placeholder.com/150',
        quantity: 2,
        price: 1999,
        orderDate: new Date().toISOString()
      },
      {
        _id: '2',
        userName: 'Another User',
        userEmail: 'another@example.com',
        productName: 'Another Product',
        productImage: 'https://via.placeholder.com/150',
        quantity: 1,
        price: 2499,
        orderDate: new Date().toISOString()
      }
    ];
    
    setOrders(dummyOrders);
    setLoading(false);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Customer Orders</h2>
      
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">
          <p className="font-bold">Error: {error}</p>
          <button 
            onClick={fetchOrders}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      )}
      
      {orders.length === 0 && !error ? (
        <p>No orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Customer</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Product</th>
                <th className="border p-2 text-left">Image</th>
                <th className="border p-2 text-left">Quantity</th>
                <th className="border p-2 text-left">Price</th>
                <th className="border p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id || `order-${index}`} className="hover:bg-gray-50">
                  <td className="border p-2">{order.userName}</td>
                  <td className="border p-2">{order.userEmail}</td>
                  <td className="border p-2">{order.productName}</td>
                  <td className="border p-2">
                    {order.productImage && (
                      <img 
                        src={order.productImage} 
                        alt={order.productName}
                        className="w-16 h-16 object-cover" 
                      />
                    )}
                  </td>
                  <td className="border p-2">{order.quantity}</td>
                  <td className="border p-2">₹{order.price}</td>
                  <td className="border p-2">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllOrders