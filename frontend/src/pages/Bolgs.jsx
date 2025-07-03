// FashionBlogComingSoon.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/blogs.module.css';

const Blog = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.comingSoonSection}>
          <div className={styles.contentWrapper}>
            <h1 className={styles.title}>Shinara Wear Blog</h1>
            <div className={styles.badge}>Coming Soon</div>
            <p className={styles.description}>
              We're preparing a collection of articles, style guides, and behind-the-scenes stories from the world of Shinara Wear. Get inspired by the latest trends, fashion tips, and exclusive interviews with our designers and brand partners.
            </p>
            <div className={styles.features}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>👗</div>
                <h3>Style Guides</h3>
                <p>Discover how to style your favorite Shinara pieces for every occasion.</p>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>📰</div>
                <h3>Fashion News</h3>
                <p>Stay updated on the latest launches, collaborations, and events.</p>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>💬</div>
                <h3>Designer Stories</h3>
                <p>Go behind the scenes with our creative team and brand partners.</p>
              </div>
            </div>
            <div className={styles.expertSection}>
              <h2>Meet Our Contributors</h2>
              <div className={styles.expertProfiles}>
                <div className={styles.expertAvatar}>
                  <div className={styles.avatarPlaceholder}></div>
                  <p>Ayesha Khan</p>
                  <span>Lead Designer</span>
                </div>
                <div className={styles.expertAvatar}>
                  <div className={styles.avatarPlaceholder}></div>
                  <p>Bilal Ahmed</p>
                  <span>Brand Manager</span>
                </div>
                <div className={styles.expertAvatar}>
                  <div className={styles.avatarPlaceholder}></div>
                  <p>Guest Stylists</p>
                  <span>Fashion Experts</span>
                </div>
              </div>
            </div>
            <div className={styles.notificationForm}>
              <h2>Get Fashion Updates</h2>
              <p>Be the first to receive our style tips, trend alerts, and exclusive content.</p>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={styles.emailInput}
                  />
                  <button type="submit" className={styles.submitButton}>
                    Subscribe
                  </button>
                </div>
                {submitted && (
                  <div className={styles.successMessage}>
                    Thank you for subscribing! You'll be the first to know when our fashion blog launches.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className={styles.previewSection}>
          <div className={styles.previewCard}>
            <div className={styles.previewContent}>
              <div className={styles.previewBadge}>Coming Soon</div>
              <h3>5 Ways to Style a Classic T-Shirt</h3>
              <p>From casual to chic—our designers share their favorite looks for every season.</p>
              <div className={styles.previewMeta}>
                <span>By Ayesha Khan</span>
                <span>4 min read</span>
              </div>
            </div>
          </div>
          <div className={styles.previewCard}>
            <div className={styles.previewContent}>
              <div className={styles.previewBadge}>Coming Soon</div>
              <h3>Behind the Scenes: Shinara x HR Fabrics</h3>
              <p>How our latest collaboration came to life, from sketch to store.</p>
              <div className={styles.previewMeta}>
                <span>By Bilal Ahmed</span>
                <span>6 min read</span>
              </div>
            </div>
          </div>
          <div className={styles.previewCard}>
            <div className={styles.previewContent}>
              <div className={styles.previewBadge}>Coming Soon</div>
              <h3>Trend Report: Summer Colors 2025</h3>
              <p>Explore the shades and styles that will define the season.</p>
              <div className={styles.previewMeta}>
                <span>By Guest Stylists</span>
                <span>5 min read</span>
              </div>
            </div>
          </div>
          <div className={styles.centerMessage}>
            <div className={styles.messageIcon}>🗓️</div>
            <h2>Launching June 2025</h2>
            <p>Our fashion experts are curating valuable content for you</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;