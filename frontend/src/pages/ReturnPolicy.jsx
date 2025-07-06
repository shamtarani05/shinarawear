import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/policy.module.css';
import { RefreshCw, Check, PackageX, Banknote } from 'lucide-react';

const ReturnPolicy = () => {
  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Return Policy</h1>
            <p className={styles.heroSubtitle}>Check Parcel Before Pay</p>
          </div>
        </section>

        {/* Policy Content */}
        <section className={styles.policySection}>
          <div className={styles.policyContainer}>
            <div className={styles.policyIntro}>
              <p>
                <strong>We do not offer returns.</strong> We offer a <strong>check parcel before pay</strong> service: you can inspect your parcel before making payment. Please ensure you are satisfied with your order at the time of delivery.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnPolicy;