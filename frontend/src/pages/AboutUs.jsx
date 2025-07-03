import React from 'react';
import { Award, Heart, Users, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/aboutus.module.css';

const AboutUs = () => {
  const brandPartners = [
    { name: 'HR Fabrics', img: '/hrfabrics.png' },
    { name: 'Saphiree', img: '/saphiree.png' },
    { name: 'Alkaram Studio', img: '/alkaram.png' },
    { name: 'Gul Ahmed', img: '/gulahmed.png' },
    { name: 'Limelight', img: '/limelight.png' },
  ];

  const [scrollIndex, setScrollIndex] = React.useState(0);
  const sliderRef = React.useRef(null);

  const scrollToIndex = (idx) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstChild?.offsetWidth || 0;
      sliderRef.current.scrollTo({ left: idx * (cardWidth + 24), behavior: 'smooth' });
    }
    setScrollIndex(idx);
  };

  const handlePrev = () => {
    if (scrollIndex > 0) scrollToIndex(scrollIndex - 1);
  };
  const handleNext = () => {
    if (scrollIndex < brandPartners.length - 1) scrollToIndex(scrollIndex + 1);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About Shinara Wear</h1>
            <p className={styles.heroSubtitle}>Crafting Modern Fashion for Every Story</p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className={styles.missionSection}>
          <div className={styles.missionContent}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              At Shinara Wear, we believe fashion is more than clothing—it's a statement of individuality, confidence, and creativity. Our mission is to empower people to express themselves through high-quality, trend-forward apparel that blends comfort, style, and sustainability.
            </p>
            <div className={styles.missionIconsContainer}>
              <div className={styles.missionIconBox}>
                <div className={styles.iconCircle}><Star className={styles.icon} /></div>
                <h3 className={styles.iconTitle}>Trendy</h3>
                <p className={styles.iconText}>Inspired by global fashion and local culture</p>
              </div>
              <div className={styles.missionIconBox}>
                <div className={styles.iconCircle}><Award className={styles.icon} /></div>
                <h3 className={styles.iconTitle}>Quality</h3>
                <p className={styles.iconText}>Premium fabrics, expert craftsmanship</p>
              </div>
              <div className={styles.missionIconBox}>
                <div className={styles.iconCircle}><Heart className={styles.icon} /></div>
                <h3 className={styles.iconTitle}>Passion</h3>
                <p className={styles.iconText}>Designed with love for every occasion</p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Partners Section */}
        <section className={styles.partnersSection}>
          <h2 className={styles.sectionTitle}>Our Brand Partners</h2>
          <div className={styles.sliderWrapper}>
            <button className={styles.sliderArrow} onClick={handlePrev} disabled={scrollIndex === 0} aria-label="Previous">
              <ChevronLeft size={28} />
            </button>
            <div className={styles.partnersSlider} ref={sliderRef}>
              {brandPartners.map((partner, idx) => (
                <div className={styles.partnerCard} key={partner.name}>
                  <div className={styles.partnerLogoCircle}>
                    <img src={partner.img} alt={partner.name} className={styles.partnerLogoImg} />
                  </div>
                  <span className={styles.partnerName}>{partner.name}</span>
                </div>
              ))}
            </div>
            <button className={styles.sliderArrow} onClick={handleNext} disabled={scrollIndex === brandPartners.length - 1} aria-label="Next">
              <ChevronRight size={28} />
            </button>
          </div>
        </section>

        {/* Company History */}
        <section className={styles.historySection}>
          <div className={styles.historyContent}>
            <div className={styles.historyText}>
              <h2 className={styles.sectionTitle}>Our Story</h2>
              <p className={styles.historyParagraph}>
                Founded in 2022, Shinara Wear started as a small boutique with a big dream: to make high-quality, stylish clothing accessible to everyone. Today, we are a leading name in modern fashion, known for our bold designs, ethical sourcing, and customer-first approach.
              </p>
              <p className={styles.historyParagraph}>
                Our collections are inspired by the vibrant energy of our community and the ever-evolving world of style. From everyday essentials to statement pieces, we create fashion that fits your life.
              </p>
            </div>
            <div className={styles.historyImage}>
              <img src="/fashion-show.jpg" alt="Shinara Wear Fashion Show" className={styles.historyImg} />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <p className={styles.teamIntro}>
            Our creative team brings together designers, stylists, and innovators passionate about redefining fashion in Pakistan and beyond.
          </p>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.teamMemberImage}>
                <img src="./shampic2.jpg" alt="Sham Tarani" className={styles.memberImg} />
              </div>
              <h3 className={styles.memberName}>Sham Tarani</h3>
              <p className={styles.memberTitle}>Founder & Creative Director</p>
              <p className={styles.memberBio}>Visionary leader with a passion for bold, accessible fashion and empowering local talent.</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.teamMemberImage}>
                <img src="./moizpic.jpg" alt="Abdul Moiz" className={styles.memberImg} />
              </div>
              <h3 className={styles.memberName}>Abdul Moiz</h3>
              <p className={styles.memberTitle}>Head of Product & Sourcing</p>
              <p className={styles.memberBio}>Ensures every Shinara piece meets our standards for quality, comfort, and style.</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.teamMemberImage}>
                <img src="https://via.placeholder.com/200" alt="Ayesha Khan" className={styles.memberImg} />
              </div>
              <h3 className={styles.memberName}>Ayesha Khan</h3>
              <p className={styles.memberTitle}>Lead Designer</p>
              <p className={styles.memberBio}>Creates our signature looks and keeps us ahead of the latest trends.</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.teamMemberImage}>
                <img src="https://via.placeholder.com/200" alt="Bilal Ahmed" className={styles.memberImg} />
              </div>
              <h3 className={styles.memberName}>Bilal Ahmed</h3>
              <p className={styles.memberTitle}>Marketing & Brand Manager</p>
              <p className={styles.memberBio}>Connects Shinara Wear with our vibrant community and partners.</p>
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
                <p className={styles.valueText}>We celebrate diversity and support the communities that inspire our collections.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIconContainer}><Heart className={styles.valueIcon} /></div>
                <h3 className={styles.valueTitle}>Sustainability</h3>
                <p className={styles.valueText}>We are committed to ethical sourcing, eco-friendly materials, and responsible production.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIconContainer}><Award className={styles.valueIcon} /></div>
                <h3 className={styles.valueTitle}>Excellence</h3>
                <p className={styles.valueText}>We never compromise on quality and continually strive to improve our designs and service.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIconContainer}><Clock className={styles.valueIcon} /></div>
                <h3 className={styles.valueTitle}>Innovation</h3>
                <p className={styles.valueText}>We blend tradition with modern trends to create unique, memorable fashion.</p>
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
