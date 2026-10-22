import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const placeOrder = async () => {
    try {
      const orderRes = await fetch('/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productID: item.productId,
            qty: item.qty,
            price: item.price,
          })),
          totalAmount: totalPrice,
          address,
          paymentID: `demo_payment_${Date.now()}`,
        }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        alert(orderData.message || 'Order creation failed');
        return;
      }

      dispatch(clearCart());
      navigate('/ordersuccess');
    } catch (error) {
      console.error(error);
      alert('Unable to place order');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    placeOrder();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>
          <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(event) => setAddress({ ...address, fullName: event.target.value })} />
          <input type="text" placeholder="Street" required value={address.street} onChange={(event) => setAddress({ ...address, street: event.target.value })} />
          <input type="text" placeholder="City" required value={address.city} onChange={(event) => setAddress({ ...address, city: event.target.value })} />
          <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={(event) => setAddress({ ...address, postalCode: event.target.value })} />
          <input type="text" placeholder="Country" required value={address.country} onChange={(event) => setAddress({ ...address, country: event.target.value })} />
          <div className="checkout-summary">
            <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
            <button type="submit" className="btn">Place Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
