import React, { useEffect, useState } from 'react';
import MedicineCard from './MedicineCard';
import styles from '../styles/topsellingproducts.module.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Clock, Tag, TrendingDown, Zap, Users } from 'lucide-react';
import { apiUrl } from '../utils/api';

const OnSaleProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({});
  const navigate = useNavigate();

  // Countdown timer for sale urgency
  useEffect(() => {
    const saleEndDate = new Date();
    saleEndDate.setDate(saleEndDate.getDate() + 3); // Sale ends in 3 days
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = saleEndDate.getTime() - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
      
      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl('/products?discountMin=10&limit=8'));
        if (!response.ok) throw new Error('Failed to fetch sale products');
        const data = await response.json();
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSaleProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.section}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>On Sale</h2>
            <div className={styles.loadingIndicator}>
              <div className={styles.spinner}></div>
              <span>Loading amazing deals...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      {/* Enhanced Header with Urgency */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          {/* Sale badge with animation */}
          <div className={styles.saleBadge}>
            <Tag size={16} />
            <span>Flash Sale</span>
            <div className={styles.salePulse}></div>
          </div>
          
          <h2 className={styles.title}>On Sale</h2>
          <p className={styles.subtitle}>
            Up to 30% OFF • Limited time only • While stocks last
          </p>
          
          {/* Countdown timer for urgency */}
          <div className={styles.countdownTimer}>
            <Clock size={16} />
            <span className={styles.timerLabel}>Sale ends in:</span>
            <div className={styles.timerDisplay}>
              <div className={styles.timerUnit}>
                <span className={styles.timerNumber}>{timeLeft.days || 0}</span>
                <span className={styles.timerText}>D</span>
              </div>
              <span className={styles.timerSep}>:</span>
              <div className={styles.timerUnit}>
                <span className={styles.timerNumber}>{timeLeft.hours || 0}</span>
                <span className={styles.timerText}>H</span>
              </div>
              <span className={styles.timerSep}>:</span>
              <div className={styles.timerUnit}>
                <span className={styles.timerNumber}>{timeLeft.minutes || 0}</span>
                <span className={styles.timerText}>M</span>
              </div>
              <span className={styles.timerSep}>:</span>
              <div className={styles.timerUnit}>
                <span className={styles.timerNumber}>{timeLeft.seconds || 0}</span>
                <span className={styles.timerText}>S</span>
              </div>
            </div>
          </div>

          {/* Sale benefits */}
          <div className={styles.saleFeatures}>
            <div className={styles.saleFeature}>
              <TrendingDown size={14} />
              <span>Up to 30% OFF</span>
            </div>
            <div className={styles.saleFeature}>
              <Zap size={14} />
              <span>Flash deals</span>
            </div>
            <div className={styles.saleFeature}>
              <Users size={14} />
              <span>Limited quantities</span>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className={styles.ctaSection}>
          <button 
            className={styles.viewAllBtn} 
            onClick={() => navigate('/products/sale')}
          >
            <span>View All Deals</span>
            <div className={styles.btnIcon}>
              <ChevronRight size={16} />
            </div>
            <div className={styles.btnGlow}></div>
          </button>
          
          {/* Scarcity indicator */}
          <div className={styles.scarcityIndicator}>
            <span className={styles.scarcityDot}></span>
            <span>⚡ Selling fast - {products.length} deals remaining!</span>
          </div>
        </div>
      </div>

      <div className={styles.decorativeLine}></div>

      {/* Social Proof and Savings Banner */}
      <div className={styles.savingsBanner}>
        <div className={styles.savingsStats}>
          <div className={styles.savingStat}>
            <span className={styles.saveAmount}>₹15,000+</span>
            <span className={styles.saveText}>Total savings by customers this month</span>
          </div>
          <div className={styles.customerActivity}>
            <div className={styles.activityDot}></div>
            <span>{setTimeout(() => {
              Math.floor(Math.random() * 10) + 20
            }, 60000)}people bought sale items in the last hour</span>
          </div>
        </div>
        
        {/* Discount highlights */}
        <div className={styles.discountHighlights}>
          <div className={styles.discountTag}>10% OFF</div>
          <div className={styles.discountTag}>20% OFF</div>
          <div className={styles.discountTag}>30% OFF</div>
        </div>
      </div>

      {/* Enhanced Product Grid */}
      <div className={styles.productSection}>
        {/* Sale benefits bar */}
        <div className={styles.saleBenefitsBar}>
          <div className={styles.saleBenefit}>🔥 Hottest deals</div>
          <div className={styles.saleBenefit}>⏰ Limited time</div>
          <div className={styles.saleBenefit}>📦 Free shipping on sale items</div>
          <div className={styles.saleBenefit}>💫 No hidden costs</div>
        </div>

        <div className={styles.grid}>
          {products.map((product, index) => (
            <div key={product._id || product.id} className={styles.productWrapper}>
              {/* Enhanced sale badges */}
              <div className={styles.productBadges}>
                {index === 0 && (
                  <div className={styles.bestDealBadge}>
                    🏆 Best Deal
                  </div>
                )}
                {index < 2 && (
                  <div className={styles.hotDealBadge}>
                    🔥 Hot Deal
                  </div>
                )}
               
              </div>
              
              <MedicineCard product={product} />
              
    
           
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Footer with Urgency and Trust */}
      <div className={styles.sectionFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerText}>
            <h3>Don't Miss Out!</h3>
            <p>These prices won't last long. Grab your favorites before the sale ends!</p>
          </div>
          
          <div className={styles.footerActions}>
            
            <button 
              className={styles.primaryBtn}
              onClick={() => navigate('/products/sale')}
            >
              Shop All Sale Items
            </button>
          </div>
        </div>
        
        {/* Enhanced trust indicators */}
        <div className={styles.trustFooter}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>✅</span>
            <span>Authentic products guaranteed</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🔒</span>
            <span>Secure checkout</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>⚡</span>
            <span>Instant confirmation</span>
          </div>
        </div>

        {/* Customer testimonial for sale items */}
        <div className={styles.saleTestimonial}>
          <div className={styles.testimonialContent}>
            <div className={styles.testimonialStars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className={styles.starFilled} />
              ))}
            </div>
            <p className={styles.testimonialText}>
              "Got 3 beautiful earrings for the price of 1! Amazing quality and super fast delivery."
            </p>
            <span className={styles.testimonialAuthor}>- Priya S., Karachi</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnSaleProducts;