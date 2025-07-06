import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, RefreshCw,
  CreditCard, Truck, Tag, X, AlertCircle, CheckCircle
} from 'lucide-react';
import styles from '../styles/cartpage.module.css';
import useCartStore from '../stores/cart-store';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/auth-store';
import { formatPKR } from '../utils/api';

const CartPage = () => {
  const { cart: cartItems, addToCart, removeFromCart, appliedPromo, setAppliedPromo, clearAppliedPromo } = useCartStore();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const user = useAuthStore((state) => state.user);
  const userCoupons = user?.coupons || [];

  // Update item quantity
  const updateQuantity = (id, change) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;
    const newQuantity = Math.max(1, item.quantity + change);
    addToCart({ ...item, quantity: newQuantity - item.quantity });
  };

  // Remove item from cart
  const removeItem = (id) => {
    removeFromCart(id);
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }
    const foundPromo = userCoupons.find(
      promo => promo.code.toLowerCase() === promoCode.toLowerCase()
    );
    if (foundPromo) {
      if (subtotal < foundPromo.minOrder) {
        setPromoError(`This code requires a minimum order of PKR ${foundPromo.minOrder.toLocaleString('en-PK')}`);
        return;
      }
      setAppliedPromo(foundPromo);
      setPromoError('');
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  // Remove applied promo code
  const removePromoCode = () => {
    clearAppliedPromo();
    setPromoError('');
  };

  // Calculate order details
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // Delivery charges always 200 PKR
  let shipping = 200;

  // Set tax to 0
  const tax = 0;
  
  // Calculate pre-discount total
  const preDiscountTotal = subtotal + tax + shipping;

  // Calculate discount on the total amount (subtotal + tax + shipping)
  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      discount = preDiscountTotal * (appliedPromo.value / 100);
    } else if (appliedPromo.discountType === 'fixed') {
      discount = Math.min(appliedPromo.value, preDiscountTotal);
    }
  }

  // Calculate final total after discount
  const total = preDiscountTotal - discount;

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Your Cart</h1>
            <p className={styles.heroSubtitle}>Review and checkout your selected items</p>
          </div>
        </section>

        <section className={styles.cartSection}>
          <div className={styles.cartContainer}>
            {cartItems.length > 0 ? (
              <div className={styles.cartLayout}>
                <div className={styles.cartItems}>
                  <h2 className={styles.sectionTitle}>
                    Cart Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  </h2>

                  <div className={styles.cartItemsList}>
                    {cartItems.map(item => (
                      <div key={item.id} className={styles.cartItem}>
                        <div className={styles.itemImageContainer}>
                          <div className={styles.itemImage}>
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className={styles.productImage}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/images/placeholder-product.png';
                                }}
                              />
                            ) : (
                              <div className={styles.placeholderImage}></div>
                            )}
                          </div>
                        </div>

                        <div className={styles.itemDetails}>
                          <h3 className={styles.itemName}>{item.name}</h3>
                          <p className={styles.itemPrice}>{formatPKR(item.price)}</p>
                        </div>

                        <div className={styles.itemActions}>
                          <div className={styles.quantityControl}>
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className={styles.quantityButton}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className={styles.quantity}>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className={styles.quantityButton}
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className={styles.removeButton}
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                            Remove
                          </button>
                        </div>

                        <div className={styles.itemTotal}>
                          <p>{formatPKR(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Verification Message if needed */}
                  {user?.needsVerification && (
                    <div className={styles.verificationMessage}>
                      <AlertCircle size={16} />
                      <span>Please verify your account to use coupons</span>
                    </div>
                  )}

                  {/* Continue Shopping Section */}
                  <div className={styles.continueShoppingSection}>
                    <button
                      className={styles.continueShoppingButton}
                      onClick={() => navigate('/products')}
                    >
                      <RefreshCw size={18} />
                      Continue Shopping
                    </button>
                  </div>

                  {/* Available Coupons Section */}
                  {cartItems.length > 0 && userCoupons?.length > 0 && (
                    <div className={styles.availableCouponsSection}>
                      <h3 className={styles.couponsTitle}>
                        <Tag size={16} />
                        Your Available Coupons
                      </h3>
                      <div className={styles.couponsList}>
                        {userCoupons.map((coupon) => {
                          const isEligible = subtotal >= coupon.minOrder;
                          const isActive = new Date(coupon.validUntil) > new Date() && coupon.isActive;
                          
                          return (
                            <div 
                              key={coupon._id} 
                              className={`${styles.couponCard} 
                                ${appliedPromo?.code === coupon.code ? styles.appliedCoupon : ''}
                                ${!isEligible || !isActive ? styles.ineligibleCoupon : ''}`
                              }
                              onClick={() => {
                                if (isEligible && isActive && !appliedPromo) {
                                  setAppliedPromo(coupon);
                                }
                              }}
                              role="button"
                              tabIndex={0}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  if (isEligible && isActive && !appliedPromo) {
                                    setAppliedPromo(coupon);
                                  }
                                }
                              }}
                            >
                              <div className={styles.couponHeader}>
                                <span className={styles.couponCode}>{coupon.code}</span>
                                <span className={styles.discountValue}>
                                  {coupon.discountType === 'percentage' 
                                    ? `${coupon.value}% OFF`
                                    : coupon.discountType === 'shipping'
                                    ? 'FREE SHIPPING'
                                    : `PKR ${coupon.value} OFF`}
                                </span>
                              </div>
                              <div className={styles.couponDetails}>
                                {coupon.description && (
                                  <p className={styles.couponDescription}>{coupon.description}</p>
                                )}
                                <p className={styles.minOrder}>
                                  Min. Order: PKR {coupon.minOrder}
                                </p>
                                {!isEligible && (
                                  <p className={styles.addMore}>
                                    Add PKR {coupon.minOrder - subtotal} more to use
                                  </p>
                                )}
                                {!isActive && (
                                  <p className={styles.expired}>Expired</p>
                                )}
                              </div>
                              {appliedPromo?.code === coupon.code && (
                                <div className={styles.appliedBadge}>Applied</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.orderSummary}>
                  <div className={styles.summaryCard}>
                    <h2 className={styles.summaryTitle}>Order Summary</h2>

                    <div className={styles.promoCodeSection}>
                      <h3 className={styles.promoCodeTitle}>
                        <Tag size={16} />
                        <span>Apply Promo Code</span>
                      </h3>

                      {appliedPromo ? (
                        <div className={styles.appliedPromoCode}>
                          <div className={styles.appliedPromoInfo}>
                            <span className={styles.appliedPromoTag}>{appliedPromo.code}</span>
                            <span>{appliedPromo.description}</span>
                          </div>
                          <button
                            onClick={removePromoCode}
                            className={styles.removePromoButton}
                            aria-label="Remove promo code"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className={styles.promoCodeForm}>
                          <div className={styles.promoCodeInput}>
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              placeholder="Enter promo code"
                              aria-label="Promo code"
                            />
                            <button
                              onClick={applyPromoCode}
                              className={styles.applyPromoButton}
                            >
                              Apply
                            </button>
                          </div>
                          {promoError && (
                            <p className={styles.promoError}>
                              <AlertCircle size={14} />
                              {promoError}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className={styles.summaryContent}>
                      <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>{formatPKR(subtotal)}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>{formatPKR(shipping)}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Estimated Tax</span>
                        <span>{formatPKR(tax)}</span>
                      </div>
                      <div className={styles.summaryRow}>
                        <span>Pre-discount Total</span>
                        <span>{formatPKR(preDiscountTotal)}</span>
                      </div>
                      {appliedPromo && (
                        <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                          <span>Discount ({appliedPromo.code})</span>
                          <span>-{formatPKR(discount)}</span>
                        </div>
                      )}
                      <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                        <strong>Total</strong>
                        <strong>{formatPKR(total)}</strong>
                      </div>
                    </div>

                    <div className={styles.shippingNote}>
                      <Truck size={16} />
                      <p>
                        Delivery charges are always PKR 200 per order.
                      </p>
                    </div>

                    <div style={{ marginTop: 24, textAlign: 'center' }}>
                      <button
                        className={styles.checkoutButton}
                        onClick={() => navigate('/checkout')}
                      >
                        Proceed to Checkout
                      </button>
                    </div>

                    <div className={styles.paymentMethods}>
                      <p>We Accept:</p>
                      <div className={styles.paymentIcons}>
                        <CreditCard size={24} className={styles.paymentIcon} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.emptyCart}>
                <div className={styles.emptyCartIcon}>
                  <ShoppingCart size={64} />
                </div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <button
                  className={styles.startShoppingButton}
                  onClick={() => navigate('/products')}
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;