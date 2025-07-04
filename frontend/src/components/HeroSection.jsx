// HeroSection.jsx
import React, { useState, useEffect } from 'react';
import styles from '../styles/herosection.module.css';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slider data for ShinAra Wear fashion categories
  const heroSlides = [
    {
      id: 1,
      category: "Men's Collection",
      bgClass: styles.slideBgMens,
      iconClass: styles.brandIconMens,
      dotClass: styles.categoryDotMens,
      title: "ELEVATE YOUR STYLE",
      subtitle: "MEN'S PREMIUM COLLECTION",
      tagline: "Sharp suits, casual comfort, and everything in between",
      ctaText: "Shop Men's",
      productImage: "./menscollection.jpg"
    },
    {
      id: 2,
      category: "Women's Collection", 
      bgClass: styles.slideBgWomens,
      iconClass: styles.brandIconWomens,
      dotClass: styles.categoryDotWomens,
      title: "UNLEASH YOUR ELEGANCE",
      subtitle: "WOMEN'S LUXURY WEAR",
      tagline: "From boardroom power to weekend chic",
      ctaText: "Explore Women's",
      productImage: "./womenscollection.jpg"
    },
    // {
    //   id: 3,
    //   category: "Ethnic Wear",
    //   bgClass: styles.slideBgEthnic,
    //   iconClass: styles.brandIconEthnic,
    //   dotClass: styles.categoryDotEthnic,
    //   title: "HERITAGE MEETS HAUTE",
    //   subtitle: "ETHNIC COUTURE COLLECTION",
    //   tagline: "Traditional craftsmanship with contemporary flair",
    //   ctaText: "Shop Ethnic",
    //   productImage: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center"
    // },
    // {
    //   id: 4,
    //   category: "Accessories",
    //   bgClass: styles.slideBgAccessories,
    //   iconClass: styles.brandIconAccessories,
    //   dotClass: styles.categoryDotAccessories,
    //   title: "PERFECT THE DETAILS",
    //   subtitle: "SIGNATURE ACCESSORIES",
    //   tagline: "The finishing touches that make all the difference",
    //   ctaText: "View Accessories",
    //   productImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"
    // },
    {
      id: 5,
      category: "New Arrivals",
      bgClass: styles.slideBgNewArrivals,
      iconClass: styles.brandIconNewArrivals,
      dotClass: styles.categoryDotNewArrivals,
      title: "FRESH OFF THE RUNWAY",
      subtitle: "NEW ARRIVALS WEEKLY",
      tagline: "Stay ahead of trends with our latest drops",
      ctaText: "See What's New",
      productImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 6,
      category: "Sale",
      bgClass: styles.slideBgSale,
      iconClass: styles.brandIconSale,
      dotClass: styles.categoryDotSale,
      title: "UNMISSABLE DEALS",
      subtitle: "UP TO 10% OFF",
      tagline: "Premium fashion at prices that don't break the bank",
      ctaText: "Shop Sale",
      productImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop&crop=center"
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
                SHINARA WEAR
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
                      e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center";
                    }}
                  />
                  
                  {/* Image overlay for better integration */}
                  <div className={styles.imageOverlay}></div>
                </div>
                
                {/* Floating badge */}
                <div className={styles.floatingBadge}>
                  NEW
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
   

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
        SHINARA WEAR
      </div>
    </section>
  );
};

export default HeroSection;