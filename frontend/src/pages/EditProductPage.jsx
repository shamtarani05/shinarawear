import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
 
  AlertCircle,
  
} from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';
import useAuthStore from '../stores/auth-store';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import styles from '../styles/addProduct.module.css';
import ProductForm from '../components/admin/ProductForm';
import { apiUrl } from '../utils/api';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  
  // State for API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // For handling arrays with multiple inputs
  const [keyBenefits, setKeyBenefits] = useState(['']);
  const [sideEffects, setSideEffects] = useState(['']);


  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(apiUrl(`/products/details/${id}`));
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        
        // Initialize form with product data
        setFormData({
          ...data,
          price: data.price?.toString() || '',
          discount: data.discount?.toString() || '0',
          quantity: data.quantity?.toString() || '1',
          rating: data.rating?.toString() || '0',
          reviewCount: data.reviewCount?.toString() || '0',
          keyBenefits: data.keyBenefits || [''],
          similarProducts: data.similarProducts || []
        });
        
        // Set arrays for multi-input fields
        setKeyBenefits(data.keyBenefits?.length > 0 ? data.keyBenefits : ['']);
        setSideEffects(data.sideEffects?.length > 0 ? data.sideEffects : ['']);
        
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError(err.message || 'Failed to load product data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  // Handle text input changes
 

  const handleEditProduct = async (formData, imageFiles, { keyFeatures, sizeChart, sizes, colors }) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      // Prepare the final form data
      const finalFormData = {
        ...formData,
        keyFeatures: keyFeatures.filter(item => item.trim() !== ''),
        sizeChart: sizeChart.filter(item => item.trim() !== ''),
        sizes: sizes.filter(item => item.trim() !== ''),
        colors: colors.filter(item => item.trim() !== ''),
      
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount),
        discountedPrice: formData.discount > 0 ? parseFloat(formData.price) * (1 - parseFloat(formData.discount)/100) : null,
        quantity: parseInt(formData.quantity),
        rating: parseFloat(formData.rating),
        reviewCount: parseInt(formData.reviewCount),
        mfgDate: formData.mfgDate || null,
        expDate: formData.expDate || null,
        keyBenefits: keyBenefits.filter(item => item.trim() !== ''),
        sideEffects: sideEffects.filter(item => item.trim() !== ''),
        usageDirections: formData.usageDirections || '',
        similarProducts: formData.similarProducts || []
      };
      
      console.log("Updating product data:", finalFormData);
      
      // Make API call to update the product
      const response = await fetch(apiUrl(`/products/update/${id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }
      
      const result = await response.json();
      console.log('Product updated:', result);
      
      setSubmitSuccess(true);
      
      // Show success message and redirect
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
      
    } catch (error) {
      console.error('Error updating product:', error);
      setSubmitError(error.message || 'Failed to update product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.adminPageContainer}>
        <div className={styles.adminContentWrapper}>
          <AdminSidebar user={user} />
          <main className={styles.adminMainContent}>
            <LoadingState message="Loading product data..." />
          </main>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.adminPageContainer}>
        <div className={styles.adminContentWrapper}>
          <AdminSidebar user={user} />
          <main className={styles.adminMainContent}>
            <ErrorState 
              error={error} 
              onRetry={() => navigate(`/admin/edit-product/${id}`)} 
            />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.adminContentWrapper}>
        <AdminSidebar user={user} />
        
        <main className={styles.adminMainContent}>
          <div className={styles.adminHeader}>
            <div className={styles.pageTitle}>
              <button 
                className={styles.backButton}
                onClick={() => navigate('/admin/products')}
              >
                <ArrowLeft size={20} />
              </button>
              <h1>Edit Product</h1>
            </div>
          </div>
          
          {/* Show submission status messages */}
          {submitError && (
            <div className={styles.errorMessage}>
              <AlertCircle size={18} />
              {submitError}
            </div>
          )}
          
          {submitSuccess && (
            <div className={styles.successMessage}>
              Product updated successfully! Redirecting...
            </div>
          )}
          
          <ProductForm
            initialValues={formData}
            onSubmit={handleEditProduct}
            isSubmitting={isSubmitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
            mode="edit"
            onCancel={() => navigate('/admin')}
          />
        </main>
      </div>
    </div>
  );
};

export default EditProductPage;
