import React from 'react';
import { Award, Heart, Users, Clock, Star, ChevronLeft, ChevronRight, Gem, Diamond, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/aboutus.module.css';

const AboutUs = () => {

 

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About Shinara Jewelry</h1>
            <p className={styles.heroSubtitle}>Crafting Timeless Elegance for Every Moment</p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className={styles.missionSection}>
          <div className={styles.missionContent}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              At Shinara Jewelry, we believe that every piece tells a story—of love, celebration, achievement, and personal style. Our mission is to create exquisite jewelry that captures life's most precious moments through exceptional craftsmanship, timeless design, and ethically sourced materials.
            </p>
            <div className={styles.missionIconsContainer}>
              <div className={styles.missionIconBox}>
                <div className={styles.iconCircle}><Sparkles className={styles.icon} /></div>
                <h3 className={styles.iconTitle}>Elegant</h3>
                <p className={styles.iconText}>Inspired by timeless beauty and modern sophistication</p>
              </div>
              <div className={styles.missionIconBox}>
                <div className={styles.iconCircle}><Diamond className={styles.icon} /></div>
                <h3 className={styles.iconTitle}>Quality</h3>
                <p className={styles.iconText}>Premium gemstones, precious metals, master craftsmanship</p>
              </div>
              <div className={styles.missionIconBox}>
                <div className={styles.iconCircle}><Heart className={styles.icon} /></div>
                <h3 className={styles.iconTitle}>Passion</h3>
                <p className={styles.iconText}>Designed with love for life's special occasions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Partners Section */}
        {/* Removed brand partners section as requested */}

        {/* Company History */}
        <section className={styles.historySection}>
          <div className={styles.historyContent}>
            <div className={styles.historyText}>
              <h2 className={styles.sectionTitle}>Our Story</h2>
              <p className={styles.historyParagraph}>
                Founded in 2022, Shinara Jewelry began as a small artisan workshop with a passion for creating beautiful, meaningful jewelry. Today, we are a trusted name in fine jewelry, known for our unique designs, ethical sourcing, and commitment to celebrating life's most precious moments.
              </p>
              <p className={styles.historyParagraph}>
                Our collections are inspired by the natural beauty of gemstones and the artistry of traditional jewelry-making techniques. From engagement rings to everyday elegance, we create pieces that become treasured heirlooms for generations to come.
              </p>
            </div>
            <div className={styles.historyImage}>
              <img src="./Black and Yellow Modern Realistic Jewelry and Fashion Logo.png" alt="Shinara Jewelry Showcase" className={styles.historyImg} />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.teamMemberImage}>
                <img src="/shampic2.jpg" alt="Shinara" className={styles.memberImg} />
              </div>
              <h3 className={styles.memberName}>Shinara</h3>
              <p className={styles.memberTitle}>Founder & Master Jeweler</p>
              <p className={styles.memberBio}>Visionary founder and master jeweler behind Shinara Jewelry, dedicated to creating timeless pieces that celebrate life's special moments.</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.teamMemberImage}>
                <img src="/shampic2.jpg" alt="Sham" className={styles.memberImg} />
              </div>
              <h3 className={styles.memberName}>Sham</h3>
              <p className={styles.memberTitle}>CEO</p>
              <p className={styles.memberBio}>Leads Shinara Jewelry with a vision for excellence, innovation, and ethical practices in the fine jewelry industry.</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.teamMemberImage}>
                <img src="/shampic2.jpg" alt="Disha" className={styles.memberImg} />
              </div>
              <h3 className={styles.memberName}>Disha</h3>
              <p className={styles.memberTitle}>Sales Manager</p>
              <p className={styles.memberBio}>Helps customers find the perfect pieces and builds lasting relationships with our valued clients and partners.</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.valuesSection}>
          <div className={styles.valuesContent}>
            <h2 className={styles.sectionTitle}>Our Values</h2>
            <div className={styles.valueCards}>
              <div className={styles.valueCard}>
                <div className={styles.valueIconContainer}><Users className={styles.valueIcon} /></div>
                <h3 className={styles.valueTitle}>Community</h3>
                <p className={styles.valueText}>We celebrate life's milestones and support the communities that inspire our beautiful creations.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIconContainer}><Heart className={styles.valueIcon} /></div>
                <h3 className={styles.valueTitle}>Ethical Sourcing</h3>
                <p className={styles.valueText}>We are committed to conflict-free diamonds, responsibly sourced gemstones, and sustainable practices.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIconContainer}><Award className={styles.valueIcon} /></div>
                <h3 className={styles.valueTitle}>Excellence</h3>
                <p className={styles.valueText}>We never compromise on quality and continually strive to perfect our craftsmanship and service.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIconContainer}><Gem className={styles.valueIcon} /></div>
                <h3 className={styles.valueTitle}>Artistry</h3>
                <p className={styles.valueText}>We blend traditional jewelry-making techniques with contemporary design to create unique, memorable pieces.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;