// Categories.jsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../styles/categories.module.css';

const categories = [
  { 
    id: 1, 
    name: "Earrings", 
    icon: "💎", 
    color: "var(--color-charcoal)",
    gradient: "var(--gradient-primary)"
  },
  { 
    id: 2, 
    name: "Necklaces", 
    icon: "📿", 
    color: "var(--color-coral)",
    gradient: "var(--gradient-sunset)"
  },
  { 
    id: 3, 
    name: "Bracelets", 
    icon: "⚡", 
    color: "var(--color-lavender)",
    gradient: "var(--gradient-premium)"
  },
  { 
    id: 4, 
    name: "Rings", 
    icon: "💍", 
    color: "var(--color-sage)",
    gradient: "var(--gradient-secondary)"
  },
  { 
    id: 5, 
    name: "Anklets", 
    icon: "🦶", 
    color: "var(--color-sunshine)",
    gradient: "var(--gradient-ocean)"
  },
  { 
    id: 6, 
    name: "Nose Pins", 
    icon: "✨", 
    color: "var(--color-coral)",
    gradient: "var(--gradient-trendy)"
  },
  { 
    id: 7, 
    name: "Bangles", 
    icon: "🌟", 
    color: "var(--color-charcoal)",
    gradient: "var(--gradient-primary)"
  },
  { 
    id: 8, 
    name: "Maang Tikka", 
    icon: "👑", 
    color: "var(--color-lavender)",
    gradient: "var(--gradient-premium)"
  },
  { 
    id: 9, 
    name: "Pendant Sets", 
    icon: "🎭", 
    color: "var(--color-sage)",
    gradient: "var(--gradient-secondary)"
  },
  { 
    id: 10, 
    name: "Chokers", 
    icon: "🔗", 
    color: "var(--color-sunshine)",
    gradient: "var(--gradient-ocean)"
  }
];

const CategorySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Responsive calculation for items to show
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsToShow(1);
      else if (width < 768) setItemsToShow(2);
      else if (width < 1024) setItemsToShow(3);
      else setItemsToShow(4);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.max(0, categories.length - itemsToShow);

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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>Shop by Category</h2>
            <p className={styles.subtitle}>Discover our curated fashion collections</p>
          </div>
          <div className={styles.navButtons}>
            <button 
              onClick={prevSlide} 
              className={`${styles.arrowBtn} ${currentIndex === 0 ? styles.disabled : styles.active}`}
              aria-label="Previous category"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide} 
              className={`${styles.arrowBtn} ${currentIndex >= totalSlides ? styles.disabled : styles.active}`}
              aria-label="Next category"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className={styles.decorativeLine}></div>
        
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
            {categories.map((category) => (
              <Link 
                to={`/collections/${category.name.toLowerCase().replace(/['\s]/g, '-')}`} 
                key={category.id} 
                className={styles.slide} 
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <div className={styles.categoryCard}>
                  <div className={styles.cardInner}>
                    <div 
                      className={styles.iconCircle}
                      style={{ 
                        background: category.gradient,
                      }}
                    >
                      <span className={styles.icon}>{category.icon}</span>
                      <div className={styles.shimmer}></div>
                    </div>
                    <div className={styles.categoryInfo}>
                      <h3 className={styles.categoryName}>{category.name}</h3>
                      <span className={styles.categoryHint}>Explore Collection</span>
                    </div>
                  </div>
                </div>
              </Link>
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
      </div>
    </section>
  );
};

export default CategorySection;