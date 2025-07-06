import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/policy.module.css';
import { Truck, Clock, Globe, AlertCircle } from 'lucide-react';

const ShippingPolicy = () => {
  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Shipping Policy</h1>
            <p className={styles.heroSubtitle}>Everything you need to know about how Shinara Wear delivers your style</p>
          </div>
        </section>

        {/* Policy Content */}
        <section className={styles.policySection}>
          <div className={styles.policyContainer}>
            <div className={styles.policyIntro}>
              <p>
                At Shinara Wear, we're committed to delivering your fashion essentials quickly and safely. Our shipping policy is designed for transparency and convenience, so you always know when to expect your order.
              </p>
            </div>

            {/* Policy highlights */}
            <div className={styles.highlightsContainer}>
              <div className={styles.highlightCard}>
                <div className={styles.highlightIcon}>
                  <Truck size={28} />
                </div>
                <h3>Shipping Method</h3>
                <p>Standard Shipping (Pakistan only)</p>
              </div>

              <div className={styles.highlightCard}>
                <div className={styles.highlightIcon}>
                  <Clock size={28} />
                </div>
                <h3>Delivery Time</h3>
                <p>4-5 days after order confirmation</p>
              </div>

              <div className={styles.highlightCard}>
                <div className={styles.highlightIcon}>
                  <Globe size={28} />
                </div>
                <h3>Shipping Charges</h3>
                <p>PKR 200 per order</p>
              </div>
            </div>

            {/* Detailed sections */}
            <div className={styles.policyContent}>
              <div className={styles.policySection}>
                <h2>Processing Time</h2>
                <p>
                  All orders are processed within 1-2 business days (Monday through Friday, excluding holidays) 
                  after receiving your order confirmation email. Orders placed on weekends or holidays will be 
                  processed on the next business day.
                </p>
              </div>

              <div className={styles.policySection}>
                <h2>Shipping Methods & Timeframes</h2>
                <div className={styles.shippingTable}>
                  <table>
                    <thead>
                      <tr>
                        <th>Shipping Method</th>
                        <th>Estimated Delivery Time</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Standard Shipping (Pakistan)</td>
                        <td>4-5 days</td>
                        <td>PKR 200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className={styles.tableNote}>
                  *We only offer national shipping within Pakistan. Delivery times are estimates and not guaranteed. Transit times may vary based on destination and other factors outside our control.
                </p>
              </div>

              <div className={styles.policySection}>
                <h2>International Orders</h2>
                <p>
                  We do not offer international shipping. Orders can only be delivered within Pakistan.
                </p>
              </div>

              <div className={styles.policySection}>
                <h2>Shipping Restrictions</h2>
                <p>
                  Some products cannot be shipped to certain jurisdictions due to regulatory restrictions. 
                  If we are unable to ship any item in your order to your location, we will notify you promptly 
                  and provide options for modifying or canceling your order.
                </p>
              </div>

              <div className={styles.policySection}>
                <h2>Shipping Address</h2>
                <p>
                  It is the customer's responsibility to provide accurate shipping information. Shinara Wear 
                  is not responsible for orders shipped to incorrect addresses provided by customers. If your 
                  package is returned to us due to an incorrect address, we will contact you to arrange for reshipping.
                </p>
              </div>

              <div className={styles.policySection}>
                <h2>Damaged or Lost Packages</h2>
                <p>
                  If your package appears damaged upon arrival, please refuse the delivery and contact our 
                  customer service team immediately. For lost packages, please allow the full estimated delivery 
                  time plus 3 additional business days before reporting a lost package. Our team will work with 
                  the shipping carrier to resolve the issue.
                </p>
              </div>
            </div>

            <div className={styles.policyUpdated}>
              <p>Last Updated: 1 July 2025</p>
            </div>

            <div className={styles.policyContact}>
              <h3>Shipping Policy</h3>
              <p>
                We only offer national shipping within Pakistan. Shipping charges are 200 PKR per order. Delivery is within 4-5 days. We do not offer international shipping.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;