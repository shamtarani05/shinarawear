// import { useState } from 'react';
import { Search, MapPin, Download, ShoppingCart, User, ChevronDown, Clock, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/header.module.css';
import useCartStore from '../stores/cart-store';
import useAuthStore from '../stores/auth-store';
import LoggedIn from './LoggedIn';
import CompactAddressDropdown from './Address';

export default function Header() {
  const cartItems = useCartStore((state) => state.cart);
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user; // Convert user object to boolean
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  const categories = [
    "Earrings",
    "Necklaces",
    "Bracelets",
    "Rings",
    "Hair kom",
    "Hair Ketcher",
    "Bangles",
    "Mala",
    "Pendant Sets",
]
  const handleAccountClick = () => {
    navigate('/auth'); // This will navigate to your Auth.jsx component
  };

  const handleCartClick = () => {
    navigate('/cart');
  }

  const handleLogout = async () => {
    console.log('Logout success');
    localStorage.removeItem('token');
    clearUser();
  };

  return (
    <header className={styles.header}>
      {/* Top Bar */}
      {/* <div className={styles.promotionBar}>
        <span>🔥 Free shipping on orders over $50 | Use code TEEZY15 for 15% OFF your first order</span>
      </div> */}

      {/* Main Header */}
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          {/* Logo Section */}
          <Link to='/' className={styles.logoSection}>
            <span className={styles.logoText}>Shinara</span>
            <span className={styles.logoTextAccent}>Wear</span>
            <div className={styles.tagline}>Style that speaks for you</div>
          </Link>

          {/* Search Bar */}
          

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            {/* Location Selector */}
          


            {/* Conditional rendering for Account/LoggedIn using auth store */}
            {isLoggedIn ? (
              <LoggedIn
                userName={user.fullName || user.email || 'User'} // Use appropriate user property
                onLogout={handleLogout}
              />
            ) : (
              <button className={styles.accountButton}
                onClick={handleAccountClick}>
                <User className={styles.buttonIcon} />
                <span className={styles.buttonText}>Account</span>
              </button>
            )}

            {/* Cart */}
            <button className={styles.cartButton}
              onClick={handleCartClick}>
              <ShoppingCart className={styles.buttonIcon} />
              <span className={styles.buttonText}>Cart</span>
              <span className={styles.cartBadge}>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Categories */}
      <nav className={styles.categoryNav}>
        <div className={styles.categoryContainer}>
          <ul className={styles.categoryList}>
            {categories.map((category, index) => (
              <li key={index} className={styles.categoryItem}>
                <Link to={`/collections/${category.toLowerCase()}`} className={styles.categoryLink}>
                  
                  {category}
                </Link>
              </li>
            ))}
            
              <li className={styles.categoryItem}>
                <Link to={'/products/sale'} className={styles.categoryLink}>
                 Sale
                </Link>
              </li>
              
          </ul>
        </div>
      </nav>
    </header>
  );
}