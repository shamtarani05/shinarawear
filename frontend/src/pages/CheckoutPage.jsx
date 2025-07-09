import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../stores/cart-store';
import useAuthStore from '../stores/auth-store';
import styles from '../styles/checkoutpage.module.css';
import { apiUrl, formatPKR } from '../utils/api';

const CheckoutPage = () => {
  const { cart: cartItems, clearCart, appliedPromo,  clearAppliedPromo } = useCartStore();
  const user = useAuthStore((state) => state.user);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Address state
  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Pakistan',
  });
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [addressError, setAddressError] = useState('');

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 200; // Always 200 PKR
  const tax = 0; // No tax
  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      discount = (subtotal + shipping + tax) * (appliedPromo.value / 100);
    } else if (appliedPromo.discountType === 'fixed') {
      discount = Math.min(appliedPromo.value, subtotal + shipping + tax);
    }
  }
  const total = subtotal + shipping + tax - discount;

  // Handle address input
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Place order
  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    setOrderError('');
    setAddressError('');
    // Validate address fields
    if (!address.name || !address.phone || !address.street || !address.city || !address.state || !address.postalCode || !address.country) {
      setAddressError('Please fill in all required shipping address fields.');
      setIsPlacing(false);
      return;
    }
    try {
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category || 'uncategorized',
          color: item.color || '',
          size: item.size || '',
          images: item.images || [],
        })),
        customer: {
          email: user?.email,
          phone: address.phone,
          name: address.name,
          id: user?.id || 'guest',
        },
        shipping: shipping,
        tax: tax,
        discount: discount,
        total: total,
        appliedPromo: appliedPromo || null,
        address: address,
      };
      const response = await fetch(apiUrl('/orders'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Order failed');
      }
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      setOrderError(error.message || 'Order failed');
    } finally {
      setIsPlacing(false);
    }
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className={styles.successContainer}>
        <h2>Your cart is empty</h2>
        <p>Please add items to your cart before proceeding to checkout.</p>
        <button className={styles.backBtn} onClick={() => navigate('/products')}>Go to Products</button>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className={styles.successContainer}>
        <h2>Thank you for your order!</h2>
        <p>Your order has been placed successfully. You will receive a confirmation email soon.</p>
        <button className={styles.backBtn} onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.title}>Checkout</h1>
      <div className={styles.formSection}>
        <h2>Shipping Address</h2>
        <form className={styles.addressForm} onSubmit={e => e.preventDefault()}>
          <input name="name" value={address.name} onChange={handleAddressChange} placeholder="Full Name" required />
          <input name="phone" value={address.phone} onChange={handleAddressChange} placeholder="Phone Number" required />
          <input name="street" value={address.street} onChange={handleAddressChange} placeholder="Street Address" required />
          <input name="city" value={address.city} onChange={handleAddressChange} placeholder="City" required />
          <input name="state" value={address.state} onChange={handleAddressChange} placeholder="State" required />
          <input name="postalCode" value={address.postalCode} onChange={handleAddressChange} placeholder="Postal Code" required />
          <input name="country" value={address.country} onChange={handleAddressChange} placeholder="Country" required />
        </form>
        {addressError && <div className={styles.orderError}>{addressError}</div>}
      </div>
      <div className={styles.summarySection}>
        <h2>Order Summary</h2>
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={`${item.id}__${item.color || ''}__${item.size || ''}`}>
                <td>
                  {item.name}
                  {item.color && <div><strong>Color:</strong> {item.color}</div>}
                  {item.size && <div><strong>Size:</strong> {item.size}</div>}
                </td>
                <td>{item.quantity}</td>
                <td>{formatPKR(item.price)}</td>
                <td>{formatPKR(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.summaryRow}><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
        <div className={styles.summaryRow}><span>Shipping</span><span>{formatPKR(shipping)}</span></div>
        <div className={styles.summaryRow}><span>Tax</span><span>{formatPKR(tax.toFixed(0))}</span></div>
        {appliedPromo && (
          <div className={styles.summaryRow}><span>Discount ({appliedPromo.code})</span><span>-{formatPKR(discount.toFixed(0))}</span></div>
        )}
        <div className={styles.totalRow}><span>Total</span><span>{formatPKR(total.toFixed(0))}</span></div>
        <div className={styles.couponSection}>
          {appliedPromo && <button className={styles.removeCouponBtn} onClick={() => clearAppliedPromo()}>Remove Coupon</button>}
        </div>
        {orderError && <div className={styles.orderError}>{orderError}</div>}
        <button className={styles.placeOrderBtn} onClick={handlePlaceOrder} disabled={isPlacing}>
          {isPlacing ? 'Placing Order...' : 'Place Order'}
        </button>
        <button className={styles.cancelBtn} onClick={() => navigate('/cart')}>Cancel / Back to Cart</button>
      </div>
    </div>
  );
};

export default CheckoutPage; 