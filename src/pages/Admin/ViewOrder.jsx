import { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the backend (replace with your actual API call)
    fetch('/api/orders')  // Replace with your actual endpoint
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <AdminPanel>
      <h1 className="text-2xl font-bold mb-5">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-5">
          {orders.map(order => (
            <div key={order._id} className="bg-white shadow p-5 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Order ID: {order._id}</h2>
              <p className="text-gray-700 mb-2">User ID: {order.user}</p>
              <div className="mb-4">
                <h3 className="font-bold mb-1">Items:</h3>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      Product ID: {item.product} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-700 mb-2">Total Price: ${order.totalPrice}</p>
              <p className="text-gray-700 mb-2">Status: {order.status}</p>
              <p className="text-gray-700 mb-2">Address: {order.address}</p>
              <p className="text-gray-700 mb-2">Payment Method: {order.paymentMethod}</p>
              <p className="text-gray-500 text-sm">Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
      </AdminPanel>
      
    </div>
  );
};

export default ViewOrders;
