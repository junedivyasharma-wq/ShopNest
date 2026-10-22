import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    data.append('image', image);

    try {
      const response = await fetch('/api/v1/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: data,
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result.message || 'Product creation failed');
        return;
      }
      alert('Product added successfully');
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      alert('Product creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={containerStyle}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        {[
          ['name', 'Product Name', 'text'],
          ['description', 'Description', 'text'],
          ['price', 'Price', 'number'],
          ['category', 'Category', 'text'],
          ['stock', 'Stock', 'number'],
        ].map(([key, placeholder, type]) => (
          type === 'text' && key === 'description' ? (
            <textarea key={key} required placeholder={placeholder} value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} rows="4" style={inputStyle} />
          ) : (
            <input key={key} required type={type} placeholder={placeholder} value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} style={inputStyle} />
          )
        ))}
        <input required type="file" accept="image/*" onChange={(event) => setImage(event.target.files[0])} style={{ color: '#fff' }} />
        <button disabled={loading || !image} className="btn" type="submit">
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </main>
  );
};

const containerStyle = { maxWidth: '650px', margin: '40px auto', padding: '30px', background: '#18181b', borderRadius: '12px', color: '#fff' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', background: '#09090b', border: '1px solid #27272a', borderRadius: '6px', color: '#fff' };

export default AddProduct;
