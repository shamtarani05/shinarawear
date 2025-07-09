import React, { useEffect, useState } from 'react';
import MedicineCard from './MedicineCard';
import styles from '../styles/newarrivalproducts.module.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { apiUrl } from '../utils/api';

const NewArrivalProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl('/products?limit=10&sort=createdAt'));
        if (!response.ok) throw new Error('Failed to fetch new arrivals');
        const data = await response.json();
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <div className={styles.section}>
        <h2 className={styles.title}>New Arrivals</h2>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>New Arrivals</h2>
        <button className={styles.viewAllBtn} onClick={() => navigate('/products/new-arrivals')}>View All</button>
      </div>
      <div className={styles.decorativeLine}></div>
      <div className={styles.grid}>
        {products.map((product) => (
          <MedicineCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivalProducts; 