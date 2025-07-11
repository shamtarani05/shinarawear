import React, { useEffect, useState} from 'react';
import MedicineCard from './MedicineCard';
import styles from '../styles/topsellingproducts.module.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { apiUrl } from '../utils/api';

const OnSaleProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOnSaleProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl('/products?discountMin=10&limit=10'));
        if (!response.ok) throw new Error('Failed to fetch on sale products');
        const data = await response.json();
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOnSaleProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>On Sale</h2>
          </div>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading sale products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>On Sale</h2>
          <button onClick={() => navigate('/products/sale')} className={styles.viewAllButton}>
            VIEW ALL
          </button>
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

export default OnSaleProducts; 