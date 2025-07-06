import React from 'react';
import styles from '../styles/footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <div className={styles.footerBrand}>
            <span className={styles.logoText}>Shinara</span>
            <span className={styles.logoTextAccent}>Wear</span>
            <p className={styles.tagline}>Style that speaks for you</p>
            <p className={styles.description}>Where modern fashion meets your individuality discover high-quality styles for every you.</p>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com/teezy" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://twitter.com/teezy" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://instagram.com/teezy" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://youtube.com/teezy" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://tiktok.com/@teezy" aria-label="TikTok"><FaTiktok /></a>
            </div>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>Collections</h3>
          <ul className={styles.footerLinks}>
            <li><Link to="/collections/men's collection">Men's Collection</Link></li>
            <li><Link to="/collections/women's collection">Women's Collection</Link></li>
            <li><Link to="/collections/ethnic wear">Ethnic Wear</Link></li>
            <li><Link to="/collections/accessories">Accessories</Link></li>
            <li><Link to="/products/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/products/sale">Sale</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/size-guide">Size Guide</Link></li>
            <li><Link to="/care-instructions">Care Instructions</Link></li>

            <li><Link to="/affiliate">Affiliate Program</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Customer Support</h3>
          <ul className={styles.footerLinks}>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns & Exchanges</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/track-order">Track Your Order</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.contactInfo}>
          <p><strong>Contact:</strong> +92 3441320657 | <a href="mailto:shinarawear@gmail.com">shinarawear@gmail.com</a></p>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Teezy. All rights reserved. | Designed with ❤️ for style lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;