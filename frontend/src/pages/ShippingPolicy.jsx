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
                <h3>Shipping Methods</h3>
                <p>Standard, Express, and International options available</p>
              </div>

              <div className={styles.highlightCard}>
                <div className={styles.highlightIcon}>
                  <Clock size={28} />
                </div>
                <h3>Processing Time</h3>
                <p>Orders processed within 1-2 business days</p>
              </div>

              <div className={styles.highlightCard}>
                <div className={styles.highlightIcon}>
                  <Globe size={28} />
                </div>
                <h3>Global Delivery</h3>
                <p>We ship to most countries worldwide</p>
              </div>

              <div className={styles.highlightCard}>
                <div className={styles.highlightIcon}>
                  <AlertCircle size={28} />
                </div>
                <h3>Order Tracking</h3>
                <p>Track your order every step of the way</p>
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
                        <td>Standard Shipping</td>
                        <td>3-5 business days</td>
                        <td>PKR 250 (Free on orders over PKR 3,000)</td>
                      </tr>
                      <tr>
                        <td>Express Shipping</td>
                        <td>1-2 business days</td>
                        <td>PKR 600</td>
                      </tr>
                      <tr>
                        <td>International Shipping</td>
                        <td>7-14 business days</td>
                        <td>Calculated at checkout</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className={styles.tableNote}>
                  *Delivery times are estimates and not guaranteed. Transit times may vary based on 
                  shipping destination and other factors outside our control.
                </p>
              </div>

              <div className={styles.policySection}>
                <h2>Order Tracking</h2>
                <p>
                  Once your order ships, you'll receive a tracking number via email. You can track your order 
                  by clicking the tracking link in your shipping confirmation email or by logging into your account 
                  on our website.
                </p>
              </div>

              <div className={styles.policySection}>
                <h2>International Orders</h2>
                <p>
                  We ship to most countries worldwide. International orders may be subject to 
                  import duties, taxes, and customs clearance fees, which are the responsibility of the recipient. 
                  Shinara Wear has no control over these charges and cannot predict what they may be.
                </p>
                <p>
                  Customs policies vary from country to country; please contact your local customs office for 
                  more information. When customs clearance procedures are required, it can cause delays beyond 
                  our original delivery estimates.
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

              <div className={styles.policySection}>
                <h2>COVID-19 Impact</h2>
                <p>
                  Due to the ongoing global situation, shipping carriers may experience delays. We are doing 
                  our best to get your orders to you as quickly as possible, but some delays may be unavoidable. 
                  We appreciate your understanding and patience.
                </p>
              </div>
            </div>

            <div className={styles.policyUpdated}>
              <p>Last Updated: April 15, 2025</p>
            </div>

            <div className={styles.policyContact}>
              <h3>Questions About Our Shipping Policy?</h3>
              <p>
                If you have any questions about our shipping policy, please contact our customer service team 
                at <a href="mailto:support@shinarawear.com">support@shinarawear.com</a> or call us at 
                <a href="tel:+92211234567">+92 21 1234 567</a>.
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