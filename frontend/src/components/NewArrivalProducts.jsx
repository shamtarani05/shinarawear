import React, { useEffect, useState } from 'react';
import MedicineCard from './MedicineCard';
import styles from '../styles/newarrivalproducts.module.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Clock, TrendingUp, Sparkles } from 'lucide-react';
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
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>New Arrivals</h2>
            <div className={styles.loadingIndicator}>
              <div className={styles.spinner}></div>
              <span>Loading fresh designs...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      {/* Enhanced Header with Value Proposition */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          {/* Attention-grabbing badge */}
          <div className={styles.newBadge}>
            <Sparkles size={16} />
            <span>Just Dropped</span>
          </div>
          
          <h2 className={styles.title}>New Arrivals</h2>
          <p className={styles.subtitle}>
            Fresh from our design studio • Limited quantities • Trending on social
          </p>
          
          {/* Value proposition highlights */}
          <div className={styles.valueProps}>
            <div className={styles.valueProp}>
              <Clock size={14} />
              <span>Added this week</span>
            </div>
            <div className={styles.valueProp}>
              <TrendingUp size={14} />
              <span>Viral on TikTok</span>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <div className={styles.ctaSection}>
          <button 
            className={styles.viewAllBtn} 
            onClick={() => navigate('/products/new-arrivals')}
          >
            <span>View All New</span>
            <div className={styles.btnIcon}>
              <ChevronRight size={16} />
            </div>
            <div className={styles.btnGlow}></div>
          </button>
          
          {/* Urgency indicator */}
          <div className={styles.urgencyText}>
            <span>⚡ Limited stock - Get them before they're gone!</span>
          </div>
        </div>
      </div>

      <div className={styles.decorativeLine}></div>

      {/* Social Proof Section */}
      <div className={styles.socialProofBar}>
        <div className={styles.socialProofItem}>
          <div className={styles.avatarGroup}>
            <div className={styles.avatar}></div>
            <div className={styles.avatar}></div>
            <div className={styles.avatar}></div>
            <div className={styles.avatarMore}>+</div>
          </div>
          <span className={styles.socialText}>
            <strong>2.1K+</strong> customers bought from new arrivals this week
          </span>
        </div>
        
        <div className={styles.ratingDisplay}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={styles.starFilled} />
            ))}
          </div>
          <span className={styles.ratingText}>4.9/5 • 1.8K reviews</span>
        </div>
      </div>

      {/* Enhanced Product Grid */}
      <div className={styles.productSection}>
        {/* Benefits bar above products */}
        <div className={styles.benefitsBar}>
          <div className={styles.benefit}>✓ Hypoallergenic materials</div>
          <div className={styles.benefit}>✓ Tarnish-resistant</div>
          <div className={styles.benefit}>✓ Check Parcel Before Pay</div>
        </div>

        <div className={styles.grid}>
          {products.map((product, index) => (
            <div key={product._id || product.id} className={styles.productWrapper}>
              {/* New arrival badge for first few items */}
              {index < 3 && (
                <div className={styles.productBadge}>
                  🆕 Just Added
                </div>
              )}
              
              <MedicineCard product={product} />
              
              {/* Quick benefits under each product */}
             
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Footer with Additional CTAs */}
      <div className={styles.sectionFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerText}>
            <h3>Stay Ahead of Trends</h3>
            <p>Be the first to know when we drop new collections. Join our style community!</p>
          </div>
          
          <div className={styles.footerActions}>
          
            <button 
              className={styles.primaryBtn}
              onClick={() => navigate('/products/new-arrivals')}
            >
              Shop All New Arrivals
            </button>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className={styles.trustFooter}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🚚</span>
            <span>Fast 5-7 day delivery</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>💎</span>
            <span>Premium quality guaranteed</span>
          </div>
     
        </div>
      </div>
    </section>
  );
};

export default NewArrivalProducts;