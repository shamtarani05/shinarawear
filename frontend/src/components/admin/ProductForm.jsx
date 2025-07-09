import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X, Upload, AlertCircle } from 'lucide-react';
import styles from '../../styles/addProduct.module.css';

const jewelryCategories = [
  "Earrings",
  "Necklaces",
  "Bracelets",
  "Rings",
  "Anklets",
  "Nose Pins",
  "Bangles",
  "Maang Tikka",
  "Pendant Sets",
  "Chokers"
];

const fitOptions = ['Slim Fit', 'Regular Fit', 'Loose Fit', 'Oversized', 'Tailored'];
const seasonOptions = ['Spring', 'Summer', 'Autumn', 'Winter', 'All Season'];
const occasionOptions = ['Casual', 'Formal', 'Party', 'Wedding', 'Sports', 'Beach', 'Office'];

const ProductForm = ({
  initialValues,
  onSubmit,
  isSubmitting,
  isUploading,
  mode = 'add',
  onCancel,
}) => {
  // Form state
  const [formData, setFormData] = useState(initialValues);
  const [keyFeatures, setKeyFeatures] = useState(initialValues.keyFeatures || ['']);
  const [sizeChart, setSizeChart] = useState(initialValues.sizeChart || ['']);
  const [sizes, setSizes] = useState(initialValues.sizes || ['']);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setFormData({ ...formData, [name]: value === '' ? '' : value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Array handlers (keyFeatures, sizeChart, sizes)
  const handleAddKeyFeature = () => setKeyFeatures([...keyFeatures, '']);
  const handleKeyFeatureChange = (index, value) => {
    const newKeyFeatures = [...keyFeatures];
    newKeyFeatures[index] = value;
    setKeyFeatures(newKeyFeatures);
  };
  const handleRemoveKeyFeature = (index) => setKeyFeatures(keyFeatures.filter((_, i) => i !== index));

  const handleAddSizeChart = () => setSizeChart([...sizeChart, '']);
  const handleSizeChartChange = (index, value) => {
    const newSizeChart = [...sizeChart];
    newSizeChart[index] = value;
    setSizeChart(newSizeChart);
  };
  const handleRemoveSizeChart = (index) => setSizeChart(sizeChart.filter((_, i) => i !== index));

  const handleAddSize = () => setSizes([...sizes, '']);
  const handleSizeChange = (index, value) => {
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };
  const handleRemoveSize = (index) => setSizes(sizes.filter((_, i) => i !== index));

  // Update formData when sizes/keyFeatures/sizeChart change
  useEffect(() => {
    setFormData(prev => ({ ...prev, sizes: sizes.filter(s => s.trim() !== '') }));
  }, [sizes]);
  useEffect(() => {
    setFormData(prev => ({ ...prev, keyFeatures: keyFeatures.filter(f => f.trim() !== '') }));
  }, [keyFeatures]);
  useEffect(() => {
    setFormData(prev => ({ ...prev, sizeChart: sizeChart.filter(s => s.trim() !== '') }));
  }, [sizeChart]);

  // Image upload logic (delegated to parent for actual upload if needed)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 15) {
      alert('You can upload a maximum of 5 images');
      return;
    }
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('One or more files exceed the 5MB size limit. Please compress your images before uploading.');
      return;
    }
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      alert('Please upload only image files (JPG, PNG, GIF, etc.)');
      return;
    }
    setImageFiles([...imageFiles, ...files]);
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };
  const handleRemoveImage = (index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);
    const newPreviewUrls = [...imagePreviewUrls];
    newPreviewUrls.splice(index, 1);
    setImagePreviewUrls(newPreviewUrls);
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, imageFiles, {
      keyFeatures,
      sizeChart,
      sizes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.productForm}>
      <div className={styles.formGrid}>
        {/* Basic Product Information */}
        <div className={styles.formSection}>
          <h3>Basic Information</h3>
          <div className={styles.formGroup}>
            <label htmlFor="name">Product Name*</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              required
              className={styles.formControl}
              placeholder="e.g., Gold Plated Earrings"
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="brandName">Brand Name*</label>
              <input 
                type="text" 
                id="brandName" 
                name="brandName" 
                value={formData.brandName}
                onChange={handleInputChange}
                required
                className={styles.formControl}
                placeholder="e.g., Elegant Jewels"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="category">Category*</label>
              <select 
                id="category" 
                name="category" 
                value={formData.category}
                onChange={handleInputChange}
                required
                className={styles.formControl}
              >
                <option value="">Select Category</option>
                {jewelryCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Product Description</label>
            <textarea 
              id="description" 
              name="description" 
              value={formData.description}
              onChange={handleInputChange}
              className={`${styles.formControl} ${styles.formTextarea}`}
              rows="4"
              placeholder="Describe the product features, style, and benefits..."
            />
          </div>
        </div>
        {/* Sizing and Fit */}
        <div className={styles.formSection}>
          <h3>Size & Fit</h3>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Available Sizes</label>
              {sizes.map((size, idx) => (
                <div key={idx} className={styles.arrayInputContainer}>
                  <input
                    type="text"
                    value={size}
                    onChange={e => handleSizeChange(idx, e.target.value)}
                    className={`${styles.formControl} ${styles.arrayInput}`}
                    placeholder={`Size ${idx + 1} (e.g., S, M, L, XL)`}
                  />
                  <button type="button" className={styles.removeButton} onClick={() => handleRemoveSize(idx)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button type="button" className={styles.addButton} onClick={handleAddSize}>
                <Plus size={16} /> <span>Add Size</span>
              </button>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fit">Fit Type</label>
              <select 
                id="fit" 
                name="fit" 
                value={formData.fit}
                onChange={handleInputChange}
                className={styles.formControl}
              >
                <option value="">Select Fit</option>
                {fitOptions.map(fit => (
                  <option key={fit} value={fit}>{fit}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Size Chart - Multiple inputs */}
          <div className={styles.formGroup}>
            <label>Size Chart (measurements)</label>
            {sizeChart.map((chart, index) => (
              <div key={index} className={styles.arrayInputContainer}>
                <input 
                  type="text"
                  value={chart}
                  onChange={(e) => handleSizeChartChange(index, e.target.value)}
                  className={`${styles.formControl} ${styles.arrayInput}`}
                  placeholder={`Size measurement ${index + 1} (e.g., S: Chest 36", Length 28")`}
                />
                <button 
                  type="button" 
                  className={styles.removeButton}
                  onClick={() => handleRemoveSizeChart(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button 
              type="button" 
              className={styles.addButton}
              onClick={handleAddSizeChart}
            >
              <Plus size={16} />
              <span>Add Size Measurement</span>
            </button>
          </div>
        </div>
        {/* Pricing and Inventory */}
        <div className={styles.formSection}>
          <h3>Pricing & Inventory</h3>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price">Price (PKR)*</label>
              <input 
                type="number" 
                id="price" 
                name="price" 
                min="0" 
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
                className={styles.formControl}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="discount">Discount (%)</label>
              <input 
                type="number" 
                id="discount" 
                name="discount" 
                min="0" 
                max="100"
                value={formData.discount}
                onChange={handleInputChange}
                className={styles.formControl}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="quantity">Quantity*</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                min="0"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className={styles.formControl}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="stockStatus">Stock Status</label>
              <select 
                id="stockStatus" 
                name="stockStatus" 
                value={formData.stockStatus}
                onChange={handleInputChange}
                className={styles.formControl}
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="season">Season</label>
              <select 
                id="season" 
                name="season" 
                value={formData.season}
                onChange={handleInputChange}
                className={styles.formControl}
              >
                <option value="">Select Season</option>
                {seasonOptions.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="occasion">Occasion</label>
              <select 
                id="occasion" 
                name="occasion" 
                value={formData.occasion}
                onChange={handleInputChange}
                className={styles.formControl}
              >
                <option value="">Select Occasion</option>
                {occasionOptions.map(occasion => (
                  <option key={occasion} value={occasion}>{occasion}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="deliveryTime">Delivery Time</label>
            <input 
              type="text" 
              id="deliveryTime" 
              name="deliveryTime" 
              value={formData.deliveryTime}
              onChange={handleInputChange}
              placeholder="e.g., 2-3 days"
              className={styles.formControl}
            />
          </div>
        </div>
        {/* Product Details */}
        <div className={styles.formSection}>
          <h3>Product Details</h3>
          <div className={styles.formGroup}>
            <label htmlFor="careInstructions">Care Instructions</label>
            <textarea 
              id="careInstructions" 
              name="careInstructions" 
              value={formData.careInstructions}
              onChange={handleInputChange}
              className={`${styles.formControl} ${styles.formTextarea}`}
              rows="3"
              placeholder="e.g., Machine wash cold, tumble dry low, do not bleach..."
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="styleNotes">Style Notes</label>
            <textarea 
              id="styleNotes" 
              name="styleNotes" 
              value={formData.styleNotes}
              onChange={handleInputChange}
              className={`${styles.formControl} ${styles.formTextarea}`}
              rows="3"
              placeholder="Styling tips and suggestions..."
            />
          </div>
          {/* Key Features - Multiple inputs */}
          <div className={styles.formGroup}>
            <label>Key Features</label>
            {keyFeatures.map((feature, index) => (
              <div key={index} className={styles.arrayInputContainer}>
                <input 
                  type="text"
                  value={feature}
                  onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
                  className={`${styles.formControl} ${styles.arrayInput}`}
                  placeholder={`Feature ${index + 1} (e.g., Breathable fabric, Wrinkle resistant)`}
                />
                <button 
                  type="button" 
                  className={styles.removeButton}
                  onClick={() => handleRemoveKeyFeature(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button 
              type="button" 
              className={styles.addButton}
              onClick={handleAddKeyFeature}
            >
              <Plus size={16} />
              <span>Add Feature</span>
            </button>
          </div>
        </div>
        {/* Product Images */}
        <div className={styles.formSection}>
          <h3>Product Images</h3>
          <div className={styles.imageUploadContainer}>
            <label htmlFor="productImages" className={styles.imageUploadLabel}>
              <Upload size={24} />
              <span>Drop images here or click to upload</span>
              <span className={styles.imageUploadHint}>Upload high-quality product images (max 5)</span>
            </label>
            <input 
              type="file" 
              id="productImages" 
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.imageUploadInput}
              disabled={imageFiles.length >= 5 || isUploading}
            />
            {imagePreviewUrls.length > 0 && (
              <div className={styles.imagePreviewContainer}>
                {imagePreviewUrls.map((image, index) => (
                  <div key={index} className={styles.imagePreview}>
                    <img src={image} alt={`Product ${index + 1}`} />
                    <button 
                      type="button" 
                      className={styles.removeImageButton}
                      onClick={() => handleRemoveImage(index)}
                      disabled={isUploading}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.formActions}>
        <button 
          type="button" 
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={isSubmitting || isUploading}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting ? (mode === 'edit' ? 'Updating Product...' : 'Adding Product...') : (mode === 'edit' ? 'Update Product' : 'Add Product')}
        </button>
      </div>
    </form>
  );
};

export default ProductForm; 