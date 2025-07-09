import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MedicineCard from './MedicineCard';
import styles from '../styles/topsellingproducts.module.css';
import { apiUrl } from '../utils/api';

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl('/sales'),{});
        if (!response.ok) {
          throw new Error('Failed to fetch top selling products');
        }
        const data = await response.json();
        setProducts(data.slice(0, 10));
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTopSellingProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Top Selling Items</h2>
          </div>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading top products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Top Selling Items</h2>
        </div>
        <div className={styles.decorativeLine}></div>
        <div className={styles.grid}>
          {products.map((product) => (
            <MedicineCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;
