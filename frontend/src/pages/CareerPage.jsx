// CareerPage.jsx
import React from 'react';
import Header from '../components/Header'; // Import your existing Header component
import Footer from '../components/Footer'; // Import your existing Footer component
import styles from '../styles/careerpage.module.css'; // CSS Module import

const CareerPage = () => {
  return (
    <div className={styles.page}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Join the Shinara Wear Team</h1>
          <p className={styles.heroSubtitle}>We're building the future of fashion. Exciting career opportunities are coming soon—help us shape the next chapter of style in Pakistan and beyond.</p>
          <a href="#notify-me" className={styles.heroCta}>Get Notified</a>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className={styles.comingSoon}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Exciting Opportunities Coming Soon</h2>
          <p className={styles.sectionSubtitle}>We're preparing to launch careers that combine creativity, technology, and retail innovation. Here's a preview of the types of roles we'll be offering:</p>
          
          <div className={styles.jobCategories}>
            <div className={styles.jobCategory}>
              <div className={styles.jobCategoryIcon}>🎨</div>
              <h3 className={styles.jobCategoryTitle}>Fashion Designers</h3>
              <p className={styles.jobCategoryDescription}>Creative minds to design our next bestsellers and set new trends in apparel.</p>
            </div>
            
            <div className={styles.jobCategory}>
              <div className={styles.jobCategoryIcon}>🛒</div>
              <h3 className={styles.jobCategoryTitle}>Retail & E-Commerce</h3>
              <p className={styles.jobCategoryDescription}>Store managers, merchandisers, and e-commerce specialists to deliver a seamless shopping experience.</p>
            </div>
            
            <div className={styles.jobCategory}>
              <div className={styles.jobCategoryIcon}>💻</div>
              <h3 className={styles.jobCategoryTitle}>Tech & Digital</h3>
              <p className={styles.jobCategoryDescription}>Developers, UI/UX designers, and digital marketers to power our online presence.</p>
            </div>
            
            <div className={styles.jobCategory}>
              <div className={styles.jobCategoryIcon}>📸</div>
              <h3 className={styles.jobCategoryTitle}>Content & Creative</h3>
              <p className={styles.jobCategoryDescription}>Photographers, stylists, and content creators to tell the Shinara story.</p>
            </div>
            
            <div className={styles.jobCategory}>
              <div className={styles.jobCategoryIcon}>📦</div>
              <h3 className={styles.jobCategoryTitle}>Logistics & Operations</h3>
              <p className={styles.jobCategoryDescription}>Supply chain, inventory, and fulfillment experts to keep us running smoothly.</p>
            </div>
            
            <div className={styles.jobCategory}>
              <div className={styles.jobCategoryIcon}>📈</div>
              <h3 className={styles.jobCategoryTitle}>Growth & Partnerships</h3>
              <p className={styles.jobCategoryDescription}>Business development, brand partnerships, and marketing strategists to expand our reach.</p>
            </div>
          </div>
          
          {/* Notification Form */}
          <div id="notify-me" className={styles.notificationForm}>
            <h3 className={styles.formTitle}>Be First To Know About New Opportunities</h3>
            <form>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>Full Name</label>
                <input type="text" id="name" className={styles.formInput} placeholder="Enter your full name" required />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                <input type="email" id="email" className={styles.formInput} placeholder="Enter your email address" required />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="interest" className={styles.formLabel}>Area of Interest</label>
                <select id="interest" className={styles.formInput} required>
                  <option value="" disabled selected>Select your area of interest</option>
                  <option value="design">Fashion Design</option>
                  <option value="retail">Retail & E-Commerce</option>
                  <option value="tech">Tech & Digital</option>
                  <option value="creative">Content & Creative</option>
                  <option value="logistics">Logistics & Operations</option>
                  <option value="growth">Growth & Partnerships</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <button type="submit" className={styles.formButton}>Notify Me When Jobs Launch</button>
            </form>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className={styles.whyJoin}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Join Shinara Wear?</h2>
          
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🌟</div>
              <div className={styles.benefitContent}>
                <h3 className={styles.benefitTitle}>Shape Fashion's Future</h3>
                <p className={styles.benefitDescription}>Be part of a team that's redefining style and making a real impact in the industry.</p>
              </div>
            </div>
            
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🚀</div>
              <div className={styles.benefitContent}>
                <h3 className={styles.benefitTitle}>Fast-Paced Growth</h3>
                <p className={styles.benefitDescription}>Join a rapidly expanding brand with opportunities for career advancement and creativity.</p>
              </div>
            </div>
            
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>💡</div>
              <div className={styles.benefitContent}>
                <h3 className={styles.benefitTitle}>Creative Culture</h3>
                <p className={styles.benefitDescription}>Work in a collaborative environment where new ideas and innovation are celebrated.</p>
              </div>
            </div>
            
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🌍</div>
              <div className={styles.benefitContent}>
                <h3 className={styles.benefitTitle}>Diversity & Inclusion</h3>
                <p className={styles.benefitDescription}>We celebrate diversity and welcome talent from all backgrounds and walks of life.</p>
              </div>
            </div>
            
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🛍️</div>
              <div className={styles.benefitContent}>
                <h3 className={styles.benefitTitle}>Exclusive Perks</h3>
                <p className={styles.benefitDescription}>Enjoy staff discounts, wellness programs, and a stylish work environment.</p>
              </div>
            </div>
            
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🌱</div>
              <div className={styles.benefitContent}>
                <h3 className={styles.benefitTitle}>Sustainability</h3>
                <p className={styles.benefitDescription}>Join a brand committed to ethical sourcing and eco-friendly practices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className={styles.values}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <p className={styles.sectionSubtitle}>These principles guide everything we do and shape our company culture. When you join Shinara Wear, you'll be part of an organization committed to these values.</p>
          
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueCardColorBar}></div>
              <div className={styles.valueCardContent}>
                <h3 className={styles.valueCardTitle}><span className={styles.valueCardIcon}>💎</span> Creativity</h3>
                <p className={styles.valueCardDescription}>We encourage bold ideas and creative thinking in everything we do.</p>
              </div>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueCardColorBar}></div>
              <div className={styles.valueCardContent}>
                <h3 className={styles.valueCardTitle}><span className={styles.valueCardIcon}>🤝</span> Integrity</h3>
                <p className={styles.valueCardDescription}>We operate with honesty, transparency, and respect for all.</p>
              </div>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueCardColorBar}></div>
              <div className={styles.valueCardContent}>
                <h3 className={styles.valueCardTitle}><span className={styles.valueCardIcon}>🌱</span> Sustainability</h3>
                <p className={styles.valueCardDescription}>We are committed to ethical sourcing, eco-friendly materials, and responsible production.</p>
              </div>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueCardColorBar}></div>
              <div className={styles.valueCardContent}>
                <h3 className={styles.valueCardTitle}><span className={styles.valueCardIcon}>🌍</span> Community</h3>
                <p className={styles.valueCardDescription}>We celebrate diversity and support the communities that inspire our collections.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerPage;