// HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { Star, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import styles from '../styles/herosection.module.css';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Enhanced hero slider data with specific benefits and social proof
  const heroSlides = [
    {
      id: 1,
      category: "Fashion Earrings",
      bgClass: styles.slideBgEarrings,
      iconClass: styles.brandIconEarrings,
      dotClass: styles.categoryDotEarrings,
      title: "STUNNING EARRINGS",
      subtitle: "HYPOALLERGENIC & TARNISH-FREE",
      tagline: "Premium quality that lasts - hoops, studs & drops that won't irritate sensitive skin",
      ctaText: "Shop Earrings",
      productImage: "./earings.jpg",
      benefits: ["Hypoallergenic", "Water-resistant", "Lifetime warranty"],
      socialProof: "4.8★ (2.1K reviews)"
    },
    {
      id: 2,
      category: "Statement Necklaces", 
      bgClass: styles.slideBgNecklaces,
      iconClass: styles.brandIconNecklaces,
      dotClass: styles.categoryDotNecklaces,
      title: "BOLD & BEAUTIFUL",
      subtitle: "LAYERING-FRIENDLY DESIGNS",
      tagline: "Mix & match our chokers and pendants - perfect for creating your unique style",
      ctaText: "Explore Necklaces",
      productImage: "./necklace.jpg",
      benefits: ["Stackable design", "Adjustable length", "Trendy metals"],
      socialProof: "4.9★ (1.8K reviews)"
    },
    {
      id: 3,
      category: "Bracelets & Bangles",
      bgClass: styles.slideBgBracelets,
      iconClass: styles.brandIconBracelets,
      dotClass: styles.categoryDotBracelets,
      title: "WRIST ELEGANCE",
      subtitle: "STACKABLE & CUSTOMIZABLE",
      tagline: "Build your arm party with our mix-and-match collection - from delicate to bold",
      ctaText: "Shop Bracelets",
      productImage: "./bracelet.jpeg",
      benefits: ["Stackable", "Adjustable fit", "Sweat-proof"],
      socialProof: "4.7★ (3.2K reviews)"
    },
    {
      id: 4,
      category: "Rings Collection",
      bgClass: styles.slideBgRings,
      iconClass: styles.brandIconRings,
      dotClass: styles.categoryDotRings,
      title: "RING PERFECTION",
      subtitle: "COMFORT-FIT GUARANTEE",
      tagline: "Cocktail rings to everyday bands - designed for all-day comfort and style",
      ctaText: "View Rings",
      productImage: "./ring.jpeg",
      benefits: ["Comfort-fit", "Size exchange", "Scratch-resistant"],
      socialProof: "4.8★ (1.5K reviews)"
    },
    {
      id: 5,
      category: "New Arrivals",
      bgClass: styles.slideBgNewArrivals,
      iconClass: styles.brandIconNewArrivals,
      dotClass: styles.categoryDotNewArrivals,
      title: "FRESH DESIGNS",
      subtitle: "TRENDING NOW ON SOCIAL",
      tagline: "Latest viral pieces from TikTok & Instagram - be the first to wear what's next",
      ctaText: "See What's New",
      productImage: "./newarrival.jpg",
      benefits: ["Social trending", "Limited edition", "Influencer approved"],
      socialProof: "Going viral! 🔥"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Increased to 6 seconds for better readability
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
            {/* Brand Badge with Trust Indicator */}
            <div className={styles.brandBadge}>
              <div className={`${styles.brandIcon} ${currentSlideData.iconClass}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className={styles.brandText}>
                SHINARA JEWELRY
              </span>
              <div className={styles.trustBadge}>
                <Users size={14} />
                <span>50K+ Happy Customers</span>
              </div>
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

            {/* Enhanced Description with Benefits */}
            <div className={styles.descriptionSection}>
              <p className={styles.description}>
                {currentSlideData.tagline}
              </p>
              
              {/* Key Benefits */}
              <div className={styles.benefitsList}>
                {currentSlideData.benefits.map((benefit, index) => (
                  <span key={index} className={styles.benefitTag}>
                    ✓ {benefit}
                  </span>
                ))}
              </div>

              {/* Social Proof */}
              <div className={styles.socialProof}>
                <Star className={styles.starIcon} />
                <span className={styles.socialProofText}>
                  {currentSlideData.socialProof}
                </span>
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <button className={styles.ctaButton}>
              <span>{currentSlideData.ctaText}</span>
              <div className={styles.ctaButtonIcon}>
                <ShoppingBag size={16} />
              </div>
              <div className={styles.ctaButtonGlow}></div>
            </button>

           

            {/* Category indicator */}
            <div className={styles.categoryIndicator}>
              <div className={`${styles.categoryDot} ${currentSlideData.dotClass}`}></div>
              <span className={styles.categoryText}>
                {currentSlideData.category}
              </span>
            </div>
          </div>

          {/* Enhanced Product Image */}
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
                    alt={`${currentSlideData.category} - ${currentSlideData.benefits.join(', ')}`}
                    className={styles.productImage}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center";
                    }}
                  />
                  
                  {/* Image overlay for better integration */}
                  <div className={styles.imageOverlay}></div>
                </div>
                
                {/* Enhanced floating badge */}
                <div className={styles.floatingBadge}>
                  ✨ TRENDY
                </div>

                {/* Quick view badge */}
                <div className={styles.quickViewBadge}>
                  👁️ Quick View
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Pagination Dots */}
      <div className={styles.pagination}>
        {heroSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.paginationDot} ${
              index === currentSlide 
                ? styles.paginationDotActive 
                : styles.paginationDotInactive
            }`}
            aria-label={`Go to ${slide.category} slide`}
          >
            <span className={styles.dotTooltip}>{slide.category}</span>
          </button>
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