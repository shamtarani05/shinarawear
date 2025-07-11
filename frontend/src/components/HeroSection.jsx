// HeroSection.jsx
import React, { useState, useEffect } from 'react';
import styles from '../styles/herosection.module.css';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slider data for ShinAra Artificial Jewelry categories
  const heroSlides = [
    {
      id: 1,
      category: "Fashion Earrings",
      bgClass: styles.slideBgEarrings,
      iconClass: styles.brandIconEarrings,
      dotClass: styles.categoryDotEarrings,
      title: "STUNNING EARRINGS",
      subtitle: "FASHION EARRING COLLECTION",
      tagline: "From hoops to studs, chandeliers to drops - perfect for every occasion",
      ctaText: "Shop Earrings",
      productImage: "./earings.jpg"
    },
    {
      id: 2,
      category: "Statement Necklaces", 
      bgClass: styles.slideBgNecklaces,
      iconClass: styles.brandIconNecklaces,
      dotClass: styles.categoryDotNecklaces,
      title: "BOLD & BEAUTIFUL",
      subtitle: "NECKLACE COLLECTION",
      tagline: "Chokers, pendants, and statement pieces that make heads turn",
      ctaText: "Explore Necklaces",
      productImage: "./necklace.jpg"
    },
    {
      id: 3,
      category: "Bracelets & Bangles",
      bgClass: styles.slideBgBracelets,
      iconClass: styles.brandIconBracelets,
      dotClass: styles.categoryDotBracelets,
      title: "WRIST ELEGANCE",
      subtitle: "BRACELET COLLECTION",
      tagline: "Delicate chains, bold bangles, and charm bracelets",
      ctaText: "Shop Bracelets",
      productImage: "./bracelet.jpeg"
    },
    {
      id: 4,
      category: "Rings Collection",
      bgClass: styles.slideBgRings,
      iconClass: styles.brandIconRings,
      dotClass: styles.categoryDotRings,
      title: "RING PERFECTION",
      subtitle: "FASHION RING COLLECTION",
      tagline: "Cocktail rings, stackable bands, and everyday essentials",
      ctaText: "View Rings",
      productImage: "./ring.jpeg"
    },
    {
      id: 5,
      category: "New Arrivals",
      bgClass: styles.slideBgNewArrivals,
      iconClass: styles.brandIconNewArrivals,
      dotClass: styles.categoryDotNewArrivals,
      title: "FRESH DESIGNS",
      subtitle: "NEW JEWELRY ARRIVALS",
      tagline: "Latest trendy pieces straight from fashion capitals",
      ctaText: "See What's New",
      productImage: "./newarrival.jpg"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className={styles.heroSection}>
      {/* Background with gradient */}
      <div className={`${styles.slideBackground} ${currentSlideData.bgClass}`}>
        {/* Animated background pattern */}
        <div className={styles.backgroundPattern}>
          <div className={`${styles.floatingCircle} ${styles.floatingCircle1}`}></div>
          <div className={`${styles.floatingCircle} ${styles.floatingCircle2}`}></div>
          <div className={`${styles.floatingCircle} ${styles.floatingCircle3}`}></div>
          <div className={`${styles.floatingCircle} ${styles.floatingCircle4}`}></div>
          <div className={`${styles.sparkleEffect} ${styles.sparkle1}`}></div>
          <div className={`${styles.sparkleEffect} ${styles.sparkle2}`}></div>
          <div className={`${styles.sparkleEffect} ${styles.sparkle3}`}></div>
        </div>
      </div>

      {/* Main content */}
      <div className={styles.contentContainer}>
        <div className={styles.contentGrid}>
          
          {/* Text Content */}
          <div className={styles.textContent}>
            {/* Brand Badge */}
            <div className={styles.brandBadge}>
              <div className={`${styles.brandIcon} ${currentSlideData.iconClass}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className={styles.brandText}>
                SHINARA JEWELRY
              </span>
            </div>

            {/* Main Headlines */}
            <div className={styles.headlineContainer}>
              <h1 className={styles.mainTitle}>
                {currentSlideData.title}
              </h1>
              <h2 className={styles.subtitle}>
                {currentSlideData.subtitle}
              </h2>
            </div>

            {/* Description */}
            <p className={styles.description}>
              {currentSlideData.tagline}
            </p>

            {/* CTA Button */}
            <button className={styles.ctaButton}>
              <span>{currentSlideData.ctaText}</span>
              <div className={styles.ctaButtonIcon}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            </button>

            {/* Category indicator */}
            <div className={styles.categoryIndicator}>
              <div className={`${styles.categoryDot} ${currentSlideData.dotClass}`}></div>
              <span className={styles.categoryText}>
                {currentSlideData.category}
              </span>
            </div>
          </div>

          {/* Product Image */}
          <div className={styles.productImageSection}>
            <div className={styles.imageContainer}>
              {/* Floating frame effects */}
              <div className={styles.floatingFrame1}></div>
              <div className={styles.floatingFrame2}></div>
              
              {/* Main image container */}
              <div className={styles.mainImageFrame}>
                <div className={styles.imageWrapper}>
                  <img
                    src={currentSlideData.productImage}
                    alt={currentSlideData.category}
                    className={styles.productImage}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center";
                    }}
                  />
                  
                  {/* Image overlay for better integration */}
                  <div className={styles.imageOverlay}></div>
                </div>
                
                {/* Floating badge */}
                <div className={styles.floatingBadge}>
                  TRENDY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className={styles.pagination}>
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.paginationDot} ${
              index === currentSlide 
                ? styles.paginationDotActive 
                : styles.paginationDotInactive
            }`}
          />
        ))}
      </div>

      {/* Brand watermark */}
      <div className={styles.brandWatermark}>
        SHINARAWEAR
      </div>
    </section>
  );
};

export default HeroSection;