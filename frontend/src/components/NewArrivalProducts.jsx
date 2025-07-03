import React, { useEffect, useState, useRef, useCallback } from 'react';
import MedicineCard from './MedicineCard';
import styles from '../styles/newarrivalproducts.module.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { apiUrl } from '../utils/api';

const NewArrivalProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
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

  // Responsive calculation for items to show
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsToShow(1);
      else if (width < 900) setItemsToShow(2);
      else if (width < 1200) setItemsToShow(3);
      else setItemsToShow(4);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.max(0, products.length - itemsToShow);

  const nextSlide = useCallback(() => {
    if (currentIndex >= totalSlides) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentIndex <= 0) {
      setCurrentIndex(totalSlides);
    } else {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex, totalSlides]);

  // Auto-slide functionality with hover pause
  useEffect(() => {
    if (!isHovering && totalSlides > 0) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextSlide, isHovering, totalSlides]);

  // Enhanced slide style with smoother animation
  const slideStyle = {
    transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
    transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
  };

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
      <div className={styles.sliderNavButtons}>
        <button 
          onClick={prevSlide} 
          className={`${styles.arrowBtn} ${currentIndex === 0 ? styles.disabled : styles.active}`}
          aria-label="Previous new arrival"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextSlide} 
          className={`${styles.arrowBtn} ${currentIndex >= totalSlides ? styles.disabled : styles.active}`}
          aria-label="Next new arrival"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div 
        className={styles.sliderWrapper}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div 
          ref={sliderRef} 
          className={styles.slider} 
          style={slideStyle}
        >
          {products.map((product) => (
            <div 
              key={product._id || product.id} 
              className={styles.slide} 
              style={{ width: `${100 / itemsToShow}%` }}
            >
              <MedicineCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.indicators}>
        {Array.from({ length: totalSlides + 1 }, (_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivalProducts; 