import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/policy.module.css';

const Affiliate = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section className={styles.affiliateHero}>
          <div className={styles.heroContent}>
            <h1 className={styles.affiliateHeroTitle}>Affiliate & Reseller Program</h1>
            <p className={styles.affiliateHeroSubtitle}>Become a Shinara Wear Reseller</p>
          </div>
        </section>
        <section>
          <div className={styles.affiliateCard}>
            <p style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-forest)' }}>
              Are you passionate about fashion and want to grow your business with a trusted brand?
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-dark-gray)' }}>
              Join the <strong>Shinara Wear Affiliate & Reseller Program</strong> and become part of our growing family! As a reseller, you'll get access to our latest collections, exclusive offers, and dedicated support.
            </p>
            <ul className={styles.affiliateList}>
              <li>✔ Access to new arrivals and bestsellers</li>
              <li>✔ Attractive reseller discounts</li>
              <li>✔ Marketing support and resources</li>
              <li>✔ Fast national shipping across Pakistan</li>
              <li>✔ Trusted quality and customer service</li>
            </ul>
            <div className={styles.affiliateCTA}>
              Interested in joining?
            </div>
            <div className={styles.affiliateContact}>
              Contact us at <a href="mailto:shinarawear@gmail.com" className={styles.affiliateContact}>shinarawear@gmail.com</a> or call <a href="tel:+923441320657" className={styles.affiliateContact}>+92 3441320657</a> to become a Shinara Wear reseller today!
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Affiliate; 