import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  X,
  Upload,
  AlertCircle
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import AdminSidebar from '../components/admin/AdminSidebar';
import useAuthStore from '../stores/auth-store';
import styles from '../styles/addProduct.module.css';
import ProductForm from '../components/admin/ProductForm';
import { apiUrl } from '../utils/api';


const AddProductPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initial values for the form
  const initialValues = {
    name: '',
    price: '',
    brandName: '',
    category: "Men's Collection",
    subCategory: 'Shirts',
    discountedPrice: '',
    discount: '0',
    quantity: '1',
    stockStatus: 'In Stock',
    deliveryTime: '2-3 days',
    rating: '0',
    reviewCount: '0',
    description: '',
    material: '',
    colors: [''],
    sizes: [''],
    fit: '',
    careInstructions: '',
    season: '',
    pattern: '',
    occasion: '',
    images: [],
    keyFeatures: [''],
    sizeChart: [''],
    styleNotes: '',
    similarProducts: []
  };

  // Image upload logic
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;
  const supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

  const uploadImagesToSupabase = async (imageFiles, setUploadProgress, setIsUploading) => {
    if (!imageFiles || imageFiles.length === 0) return [];
    setIsUploading(true);
    const uploadedUrls = [];
    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const filePath = `products/${fileName}`;
        const options = { contentType: file.type, cacheControl: '3600' };
        const { error } = await supabase.storage.from('shinarawear').upload(filePath, file, options);
        if (error) throw new Error(`Error uploading image: ${error.message}`);
        const { data: urlData } = supabase.storage.from('shinarawear').getPublicUrl(filePath);
        uploadedUrls.push(urlData.publicUrl);
        setUploadProgress(Math.floor(((i + 1) / imageFiles.length) * 100));
      }
      return uploadedUrls;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle form submission
  const handleAddProduct = async (formData, imageFiles, { keyFeatures, sizeChart, sizes, colors }) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      // Upload images
      let uploadProgress = 0;
      let uploadedImageUrls = [];
      if (imageFiles && imageFiles.length > 0) {
        uploadedImageUrls = await uploadImagesToSupabase(imageFiles, (p) => (uploadProgress = p), setIsUploading);
      }
      // Prepare the final form data
      const finalFormData = {
        ...formData,
        id: generateProductId(),
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
        images: uploadedImageUrls
      };
      // API call
      const response = await fetch(apiUrl('/products/add'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalFormData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }
      setSubmitSuccess(true);
      setTimeout(() => { navigate('/admin/products'); }, 1500);
    } catch (error) {
      setSubmitError(error.message || 'Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateProductId = () => {
    return 'CLT' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.adminContentWrapper}>
        <AdminSidebar user={user} />
        <main className={styles.adminMainContent}>
          <div className={styles.adminHeader}>
            <div className={styles.pageTitle}>
              <button className={styles.backButton} onClick={() => navigate('/admin')}>
                <ArrowLeft size={20} />
              </button>
              <h1>Add New Product</h1>
            </div>
          </div>
          {submitError && (
            <div className={styles.errorMessage}>
              <AlertCircle size={18} />
              {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className={styles.successMessage}>
              Product added successfully! Redirecting...
            </div>
          )}
          <ProductForm
            initialValues={initialValues}
            onSubmit={handleAddProduct}
            isSubmitting={isSubmitting}
            isUploading={isUploading}
            submitError={submitError}
            submitSuccess={submitSuccess}
            mode="add"
            onCancel={() => navigate('/admin')}
          />
        </main>
      </div>
    </div>
  );
};

export default AddProductPage;