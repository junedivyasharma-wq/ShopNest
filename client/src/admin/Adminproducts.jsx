import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    const response = await fetch('/api/v1/products');
    const data = await response.json();
    setProducts(data.products || []);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const removeProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    const response = await fetch(`/api/v1/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (response.ok) fetchProducts();
    else alert('Product deletion failed');
  };

  return (
    <main className="page-container">
      <h1>Manage Products</h1>
      <Link to="/admin/add-product" className="btn">Add Product</Link>
      <div className="product-grid">
        {products.map((product) => (
          <article key={product._id} className="product-card">
            <img src={product.imageURL} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p>Stock: {product.stock}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to={`/admin/edit-product/${product._id}`} className="btn">Edit</Link>
                <button onClick={() => removeProduct(product._id)} className="btn">Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default AdminProducts;
