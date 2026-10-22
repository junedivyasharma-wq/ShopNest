import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/v1/analytics', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Unable to load analytics');
        }
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.token) {
      fetchStats();
    }
  }, [user]);

  return (
    <main className="page-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome back. Manage your ShopNest store from here.</p>
      <div style={statsGridStyle}>
        <section style={statStyle}>
          <span>Total Users</span>
          <strong>{stats?.totalusers ?? '—'}</strong>
        </section>
        <section style={statStyle}>
          <span>Total Orders</span>
          <strong>{stats?.totalorders ?? '—'}</strong>
        </section>
        <section style={statStyle}>
          <span>Total Products</span>
          <strong>{stats?.totalproducts ?? '—'}</strong>
        </section>
        <section style={statStyle}>
          <span>Demo Revenue</span>
          <strong>₹{stats?.totalRevenue?.toFixed(2) ?? '—'}</strong>
        </section>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '28px' }}>
        <section style={cardStyle}>
          <h2>Products</h2>
          <p>Add new products, update details, or remove unavailable items.</p>
          <Link to="/admin/products" className="btn">Manage Products</Link>
        </section>
        <section style={cardStyle}>
          <h2>Add Product</h2>
          <p>Upload product images and enter pricing, stock, and category details.</p>
          <Link to="/admin/add-product" className="btn">Add Product</Link>
        </section>
        <section style={cardStyle}>
          <h2>Orders</h2>
          <p>Review customer orders and update their delivery status.</p>
          <Link to="/admin/orders" className="btn">Manage Orders</Link>
        </section>
        <section style={cardStyle}>
          <h2>Users</h2>
          <p>View registered users and their assigned account roles.</p>
          <Link to="/admin/users" className="btn">Manage Users</Link>
        </section>
      </div>
    </main>
  );
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: '16px',
  marginTop: '28px',
};
const statStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '20px',
  background: '#18181b',
  border: '1px solid #27272a',
  borderRadius: '12px',
};
const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '22px',
  background: '#18181b',
  border: '1px solid #27272a',
  borderRadius: '12px',
};

export default AdminDashboard;
