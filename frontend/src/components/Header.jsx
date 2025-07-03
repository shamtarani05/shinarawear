import { useState } from 'react';
import { Search, MapPin, Download, ShoppingCart, User, ChevronDown, Clock, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/header.module.css';
import useCartStore from '../stores/cart-store';
import useAuthStore from '../stores/auth-store';
import LoggedIn from './LoggedIn';
import CompactAddressDropdown from './Address';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const cartItems = useCartStore((state) => state.cart);
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user; // Convert user object to boolean
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  const categories =[
  { name: "Men's Collection", icon: null },
  { name: "Women's Collection", icon: null },
  { name: "Ethnic Wear", icon: null },
  { name: "Accessories", icon: null },
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with the query
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
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

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className={styles.searchBarMobile}>
          <input
            type="text"
            placeholder="Search Teezy..."
            className={styles.searchInputMobile}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchButtonMobile}>
            <Search className={styles.searchIconMobile} />
          </button>
        </form>
      </div>

      {/* Navigation Categories */}
      <nav className={styles.categoryNav}>
        <div className={styles.categoryContainer}>
          <ul className={styles.categoryList}>
            {categories.map((category, index) => (
              <li key={index} className={styles.categoryItem}>
                <Link to={`/collections/${category.name.toLowerCase()}`} className={styles.categoryLink}>
                  {category.icon && <span className={styles.categoryIcon}>{category.icon}</span>}
                  {category.name}
                </Link>
              </li>
            ))}
             <li className={styles.categoryItem}>
                <Link to={'/products/new-arrivals'} className={styles.categoryLink}>
                 New Arrivals
                </Link>
              </li>
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