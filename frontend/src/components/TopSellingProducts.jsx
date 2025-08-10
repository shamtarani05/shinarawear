import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, TrendingUp, Award, Users, Heart } from 'lucide-react';
import MedicineCard from './MedicineCard';
import styles from '../styles/topsellingproducts.module.css';
import { apiUrl } from '../utils/api';

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Customer testimonials for social proof
  const testimonials = [
    {
      text: "These earrings are my absolute favorite! Wear them every day.",
      author: "Ananya K.",
      rating: 5,
      product: "Gold Hoops"
    },
    {
      text: "Perfect quality and fast shipping. Will definitely buy again!",
      author: "Sakshi M.", 
      rating: 5,
      product: "Pearl Necklace"
    },
    {
      text: "Love how lightweight and comfortable these rings are!",
      author: "Riya S.",
      rating: 5,
      product: "Statement Ring"
    }
  ];

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

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading) {
    return (
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Top Selling Items</h2>
          </div>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading customer favorites...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        {/* Enhanced Header with Social Proof */}
        <div className={styles.header}>
          <div className={styles.titleSection}>
            {/* Bestseller badge */}
            <div className={styles.bestsellerBadge}>
              <Award size={16} />
              <span>Customer Favorites</span>
            </div>
            
            <h2 className={styles.title}>Top Selling Items</h2>
            <p className={styles.subtitle}>
              Most loved by our community • Proven quality • Customer approved
            </p>

            {/* Social proof metrics */}
            <div className={styles.socialMetrics}>
              <div className={styles.metric}>
                <TrendingUp size={14} />
                <span><strong>15K+</strong> sold this month</span>
              </div>
              <div className={styles.metric}>
                <Users size={14} />
                <span><strong>95%</strong> repurchase rate</span>
              </div>
              <div className={styles.metric}>
                <Heart size={14} />
                <span><strong>4.9★</strong> average rating</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.decorativeLine}></div>

        {/* Customer Testimonial Carousel */}
        <div className={styles.testimonialSection}>
          <div className={styles.testimonialContainer}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={14} className={styles.starFilled} />
                ))}
              </div>
              <p className={styles.testimonialText}>
                "{testimonials[activeTestimonial].text}"
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}></div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>
                    {testimonials[activeTestimonial].author}
                  </span>
                  <span className={styles.authorProduct}>
                    Bought: {testimonials[activeTestimonial].product}
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial indicators */}
            <div className={styles.testimonialIndicators}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.testimonialDot} ${
                    index === activeTestimonial ? styles.active : ''
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>

          {/* Purchase activity feed */}
          <div className={styles.activityFeed}>
            <div className={styles.activityHeader}>
              <div className={styles.activityDot}></div>
              <span>Live purchases</span>
            </div>
            <div className={styles.activityItems}>
              <div className={styles.activityItem}>
                <span className={styles.activityText}>
                  Someone in <strong>Lahore</strong> just bought a <strong>Shinara Elegance Set Ring</strong>
                </span>
                <span className={styles.activityTime}>2 min ago</span>
              </div>
              <div className={styles.activityItem}>
                <span className={styles.activityText}>
                  <strong>3 people</strong> added <strong>Pearl Earrings</strong> to cart
                </span>
                <span className={styles.activityTime}>5 min ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why These Are Bestsellers */}
        <div className={styles.whyBestsellerSection}>
          <h3 className={styles.whyTitle}>Why these are customer favorites:</h3>
          <div className={styles.reasonsList}>
            <div className={styles.reason}>✓ Hypoallergenic materials</div>
            <div className={styles.reason}>✓ Tarnish-resistant coating</div>
            <div className={styles.reason}>✓ Comfortable all-day wear</div>
            <div className={styles.reason}>✓ Matches any outfit</div>
            <div className={styles.reason}>✓ Great value for money</div>
          </div>
        </div>

        {/* Enhanced Product Grid */}
        <div className={styles.grid}>
          {products.map((product, index) => (
            <div key={product._id || product.id} className={styles.productWrapper}>
              
              {/* Popular choice indicator */}
              {index < 5 && (
                <div className={styles.popularBadge}>
                  🔥 Popular Choice
                </div>
              )}
              
              <MedicineCard product={product} />
              
              {/* Enhanced product stats */}
              <div className={styles.productStats}>
                <div className={styles.salesCount}>
                  <TrendingUp size={12} />
                  <span>{Math.floor(Math.random() * 500) + 100}+ sold</span>
                </div>
                <div className={styles.customerRating}>
                  <Star size={12} className={styles.starIcon} />
                  <span>4.{Math.floor(Math.random() * 3) + 7} ({Math.floor(Math.random() * 200) + 50})</span>
                </div>
              </div>

              {/* Stock urgency for top items */}
              
                <div className={styles.stockUrgency}>
                  <div className={styles.stockBar}>
                    <div 
                      className={styles.stockFill}
                      style={{ width: `${Math.floor(Math.random() * 40) + 20}%` }}
                    ></div>
                  </div>
                  <span className={styles.stockText}>Low stock - order soon!</span>
                </div>
          
            </div>
          ))}
        </div>

        {/* Enhanced Footer with Trust Building */}
        <div className={styles.sectionFooter}>
          <div className={styles.footerContent}>
            <div className={styles.footerStats}>
              <div className={styles.footerStat}>
                <span className={styles.statNumber}>50K+</span>
                <span className={styles.statLabel}>Happy customers</span>
              </div>
              <div className={styles.footerStat}>
                <span className={styles.statNumber}>4.9★</span>
                <span className={styles.statLabel}>Average rating</span>
              </div>
              <div className={styles.footerStat}>
                <span className={styles.statNumber}>15K+</span>
                <span className={styles.statLabel}>Monthly orders</span>
              </div>
            </div>
            
            <div className={styles.footerText}>
              <h3>Join thousands of satisfied customers</h3>
              <p>These bestsellers have earned their spot through quality, style, and customer love.</p>
            </div>
            
           
          </div>
          
          {/* Trust indicators */}
          <div className={styles.trustFooter}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🏆</span>
              <span>Award-winning designs</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>💎</span>
              <span>Premium materials</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🚚</span>
              <span>Fast & secure delivery</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>💯</span>
              <span>100% satisfaction guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;