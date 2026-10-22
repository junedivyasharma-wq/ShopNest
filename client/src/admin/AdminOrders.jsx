import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await fetch('/api/v1/orders', {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await response.json();
    setOrders(data.orders || []);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    const response = await fetch(`/api/v1/orders/${id}/Status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ Status: status }),
    });
    if (response.ok) fetchOrders();
    else alert('Order status update failed');
  };

  return (
    <main className="page-container">
      <h1>Manage Orders</h1>
      {orders.map((order) => (
        <article key={order._id} style={cardStyle}>
          <strong>Order: {order._id}</strong>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.status}</p>
          <select value={order.status} onChange={(event) => updateStatus(order._id, event.target.value)} style={selectStyle}>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </article>
      ))}
    </main>
  );
};

const cardStyle = { marginTop: '16px', padding: '20px', background: '#18181b', borderRadius: '10px' };
const selectStyle = { padding: '8px', background: '#09090b', color: '#fff', border: '1px solid #27272a' };

export default AdminOrders;
