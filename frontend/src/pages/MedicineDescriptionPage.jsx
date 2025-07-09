// ProductDescriptionPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingState from '../components/common/LoadingState';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTabs from '../components/product/ProductTabs';
import SimilarProducts from '../components/product/SimilarProducts';
import FAQSection from '../components/product/FAQSection';
import styles from '../styles/medicinedescriptionpage.module.css';
import useCartStore from '../stores/cart-store';
import { apiUrl } from '../utils/api';
import TopSellingProducts from '../components/TopSellingProducts';

export default function ProductDescriptionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [showCareInstructions, setShowCareInstructions] = useState(false);

  // Cart store functions
  const addToCart = useCartStore(state => state.addToCart);
  const getItemQuantity = useCartStore(state => state.getItemQuantity);
  const cart = useCartStore(state => state.cart);

  // Generate FAQs based on product data
  const generateProductFAQs = (product) => {
    if (!product) return [];

    const faqs = [];

    // Size-related FAQs
    if (product.size) {
      faqs.push({
        question: "What size should I choose?",
        answer: `This product is available in ${product.size}. Please refer to our size chart for detailed measurements. If you're between sizes, we recommend sizing up for a more comfortable fit.`
      });
    }

    if (product.sizeChart && product.sizeChart.length > 0) {
      faqs.push({
        question: "How do I use the size chart?",
        answer: "Measure your chest, waist, and hips, then compare with our size chart. For the most accurate fit, measure yourself while wearing undergarments similar to what you'll wear with this item."
      });
    }

    // Material and care FAQs
    if (product.material) {
      faqs.push({
        question: "What material is this made of?",
        answer: `This product is made of ${product.material}. This material offers comfort, durability, and style suitable for various occasions.`
      });
    }

    if (product.careInstructions) {
      faqs.push({
        question: "How should I care for this item?",
        answer: typeof product.careInstructions === 'string' ? product.careInstructions :
          "Follow the detailed care instructions provided with the product for best maintenance."
      });
    } else {
      faqs.push({
        question: "How should I care for this item?",
        answer: "For best results, follow the care label instructions. Generally, store in a cool, dry place and clean according to material specifications."
      });
    }

    // Fit and style FAQs
    if (product.fit) {
      faqs.push({
        question: "What is the fit like?",
        answer: `This item has a ${product.fit} design. ${product.fit === 'Slim Fit' ? 'It follows your body contours closely for a tailored look.' :
          product.fit === 'Regular Fit' ? 'It offers a comfortable, classic fit that\'s not too tight or loose.' :
            product.fit === 'Loose Fit' ? 'It provides a relaxed, comfortable fit with extra room.' :
              product.fit === 'Oversized' ? 'It\'s designed to be worn loose for a trendy, comfortable style.' :
                'It\'s professionally tailored for a sophisticated appearance.'}`
      });
    }

    // Color and styling FAQs
    if (product.color) {
      faqs.push({
        question: "Will the color fade after washing?",
        answer: `This ${product.color} item is made with quality dyes and materials. Following the care instructions will help maintain the color vibrancy.`
      });
    }

    // Delivery and return FAQs
    faqs.push({
      question: "How long will delivery take?",
      answer: `Standard delivery takes ${product.deliveryTime || '2-3 days'}. We also offer express delivery options for faster shipping. You'll receive a tracking number once your order is dispatched.`
    });

    faqs.push({
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unworn items with original tags. Items must be in original condition. Free returns are available for defective or incorrect items."
    });

    faqs.push({
      question: "Can I exchange for a different size?",
      answer: "Yes, we offer free size exchanges within 30 days of purchase. The item must be unworn with original tags attached. Please contact our customer service to initiate an exchange."
    });

    // Stock and availability FAQs
    if (product.stockStatus === 'Low Stock') {
      faqs.push({
        question: "How many items are left in stock?",
        answer: "This item is currently in low stock. We recommend ordering soon to avoid disappointment. Stock levels are updated in real-time on our website."
      });
    }

    // Brand-specific FAQs
    if (product.brandName) {
      faqs.push({
        question: `Tell me more about ${product.brandName}`,
        answer: `${product.brandName} is known for quality craftsmanship and attention to detail. This brand focuses on creating stylish, durable pieces that offer both comfort and style.`
      });
    }

    return faqs;
  };

  useEffect(() => {
    // Fetch product data from API
    const fetchProductData = async () => {
      try {
        setLoading(true);
        console.log(id);
        const response = await fetch(apiUrl(`/products/details/${id}`));

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const data = await response.json();
        setProductData(data);
        console.log(data);

      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);

        // Fallback to mock data for demo
        setProductData({
          id: "CLOTH123",
          name: "Classic Cotton T-Shirt",
          brandName: "URBAN STYLE",
          price: 1499,
          discountedPrice: 1199,
          discount: 20,
          currency: "Rs.",
          images: [
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=500&fit=crop"
          ],
          description: "A premium quality cotton t-shirt with a classic fit, perfect for everyday wear.",
          stockStatus: "In Stock",
          availableStock: 20,
          quantity: 20,
          colors: ["White", "Black", "Navy", "Olive"],
          sizes: ["S", "M", "L", "XL", "XXL"],
          color: "White",
          material: "100% Cotton",
          fit: "Regular Fit",
          size: "M",
          deliveryTime: "2-4 days",
          careInstructions: "Machine wash cold with like colors. Do not bleach. Tumble dry low. Iron on low if needed.",
          productCode: "TSHIRT-URBAN-001",
          category: "Clothing",
          subCategory: "T-Shirts"
        });
        setError(null); // Clear error since we have fallback data
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  // Determine product category for breadcrumb
  const productCategory = productData?.category || "Products";

  // Handle loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.container} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}>
          <LoadingState
            message="Loading product information..."
            spinnerColor="#00A36C"
            textColor="#00A36C"
            style={{ color: 'green' }}
          />
        </div>
        <Footer />
      </>
    );
  }

  // Handle error state
  if (error && !productData) {
    return (
      <>
        <Header />
        <div className={styles.errorContainer}>
          <h2>Something went wrong</h2>
          <p>{error || "Product not found"}</p>
          <button className={styles.backButton} onClick={() => window.history.back()}>
            <ArrowLeft size={18} className={styles.backIcon} />
            Back to Products
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // Generate FAQs for the product
  const productFAQs = productData?.faqs || generateProductFAQs(productData);

  return (
    <>
      <Header />
      <div className={styles.pageContainer}>
        {/* Navigation breadcrumb */}
        <div className={styles.breadcrumbContainer}>
          <div className={styles.breadcrumbWrapper}>
            <span className={styles.breadcrumbLink}>Home</span>
            <span>/</span>
            <span className={styles.breadcrumbLink}>{productCategory}</span>
            <span>/</span>
            <span>{productData?.name}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className={styles.backButton}
          >
            <ArrowLeft size={16} />
            Back to {productCategory}
          </button>

          {/* Product Section */}
          <div className={styles.productSection}>
            {/* Left - Images using ProductImageGallery component */}
            <ProductImageGallery 
              images={productData?.images || []}
              productName={productData?.name || "Product"}
            />

            {/* Right - Product Info using ProductInfo component */}
            <ProductInfo 
              product={productData}
              addToCart={addToCart}
              getItemQuantity={getItemQuantity}
              cart={cart}
            />
          </div>

          {/* Care Instructions Section */}
          {productData?.careInstructions && (
            <div className={styles.careSection}>
              <button
                onClick={() => setShowCareInstructions(!showCareInstructions)}
                className={styles.careHeader}
              >
                Care Instructions
                <ChevronDown
                  size={20}
                  className={`${styles.careChevron} ${showCareInstructions ? styles.careChevronOpen : ''
                    }`}
                />
              </button>

              {showCareInstructions && (
                <div className={styles.careContent}>
                  {typeof productData.careInstructions === 'object' ? (
                    Object.entries(productData.careInstructions).map(([key, value]) => (
                      <div key={key} className={styles.careItem}>
                        <span className={styles.careLabel}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                        </span>
                        <br />
                        {value}
                      </div>
                    ))
                  ) : (
                    <div className={styles.careItem}>
                      {productData.careInstructions}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tabs section using ProductTabs component */}
          <ProductTabs
            productData={productData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Similar Products section using SimilarProducts component */}
          {productData?.similarProducts?.length > 0 && (
            <SimilarProducts
              products={productData.similarProducts}
              navigate={navigate}
              addToCart={addToCart}
            />
          )}

          {/* FAQ Section using FAQSection component with generated FAQs */}
          <FAQSection
            faqs={productFAQs}
            prescriptionRequired={productData?.prescriptionRequired || false}
            productType="product"
          />
        </div>
        <TopSellingProducts/>
      </div>
      <Footer />
    </>
  );
}