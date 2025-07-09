import { useState } from 'react';
import styles from '../styles/medicinecard.module.css';
import { Heart, ShoppingCart, Info, AlertCircle, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPKR } from '../utils/api';

export default function MedicineCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleFavorite = (e) => {
    e.stopPropagation(); // Stop event propagation
    setIsFavorite(!isFavorite);
  };

  // New function to navigate to product detail page
  const handleProductDetail = (e) => {
    e.stopPropagation(); // Stop event propagation
    navigate('/product/' + product._id);
  };


  const handleclick = () => {
    navigate('/product/' + product._id);
  };

  return (
    <div className={styles.container} onClick={handleclick}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img
            src={product.images[0] || "/api/placeholder/180/140"}
            alt={product.name}
            className={styles.tshirtImage}
          />
          <button
            className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
            onClick={handleFavorite}
            aria-label="Add to favorites"
          >
            <Heart
              size={16}
              fill={isFavorite ? "#FF5722" : "none"}
              color={isFavorite ? "#FF5722" : "#757575"}
            />
          </button>
          {product.isPrescriptionRequired && <div className={styles.badge}>Rx</div>}
        </div>

        <div className={styles.contentContainer}>
          <h3 className={styles.medicineName}>{product.name}</h3>
          <p className={styles.manufacturer}>By {product.brandName}</p>

          <div className={styles.priceContainer}>
            <span className={styles.price}>{formatPKR(product.discountedPrice || product.price)}</span>
            {product.discountedPrice && (
              <div className={styles.discountWrapper}>
                <span className={styles.mrp}>MRP: <span className={styles.strikethrough}>{formatPKR(product.price)}</span></span>
                {product.discount && <span className={styles.discount}>{product.discount}% OFF</span>}
              </div>
            )}
          </div>

          <div className={styles.stockInfo}>
            {product.stockStatus === 'In Stock' && (
              <div className={styles.inStock}>
                <Check size={12} className={styles.checkIcon} />
                <span>In Stock</span>
              </div>
            )}
            {product.stockStatus === 'Low Stock' && (
              <div className={styles.lowStock}>
                <AlertCircle size={12} />
                <span>Low Stock</span>
              </div>
            )}
            {product.stockStatus === 'Out of Stock' && (
              <div className={styles.outOfStock}>
                <AlertCircle size={12} />
                <span>Out of Stock</span>
              </div>
            )}
            {product.delivery && <div className={styles.delivery}>Delivery: {product.delivery}</div>}
          </div>

          <div className={styles.buttonContainer}>
            <button
              className={`${styles.addToCartButton} ${styles.mobileHide}`}
              onClick={handleProductDetail}
              aria-label="View product details"
            >
              <ShoppingCart size={14} />
              View
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
