const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    id: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    brandName: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        enum: [ "Earrings",
            "Necklaces",
            "Bracelets",
            "Rings",
            "Anklets",
            "Nose Pins",
            "Bangles",
            "Maang Tikka",
            "Pendant Sets",
            "Chokers"]
    },
    discountedPrice: { type: Number, min: 0 },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    stockStatus: { 
        type: String, 
        enum: ['In Stock', 'Low Stock', 'Out of Stock', 'Coming Soon'], 
        default: 'Out of Stock' 
    },
    deliveryTime: { type: String, default: '2-3 days' },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, min: 0, default: 0 },
    description: { type: String},
    
    // Clothing-specific fields
    colors: { type: [String]},
    sizes: { type: [String]},
    
    careInstructions: { type: String },
    season: { 
        type: String,
        enum: ['Spring', 'Summer', 'Autumn', 'Winter', 'All Season']
    },
    occasion: { 
        type: String,
        enum: ['Casual', 'Formal', 'Party', 'Wedding', 'Sports', 'Beach', 'Office']
    },
    
    // Arrays for multiple values
    images: { type: Array, default: [] },
    keyFeatures: { type: Array, default: [] },
    sizeChart: { type: Array, default: [] },
    styleNotes: { type: String },
    similarProducts: { type: Array, default: [] },
    
    // Metadata
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Pre-save middleware to automatically set stock status based on quantity
productSchema.pre('save', function(next) {
    // Update stockStatus based on quantity
    if (this.quantity === 0) {
        this.stockStatus = 'Out of Stock';
    } else if (this.quantity <= 10) {
        this.stockStatus = 'Low Stock';
    } else {
        this.stockStatus = 'In Stock';
    }
    
    // Calculate discounted price if discount is provided
    if (this.discount > 0 && this.price) {
        this.discountedPrice = this.price * (1 - this.discount / 100);
    } else {
        this.discountedPrice = null;
    }
    
    // Update the updatedAt timestamp
    this.updatedAt = new Date();
    
    next();
});

// Index for better query performance
productSchema.index({ category: 1 });
productSchema.index({ brandName: 1 });
productSchema.index({ price: 1 });
productSchema.index({ stockStatus: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
    return `PKR ${this.price.toLocaleString()}`;
});

// Virtual for formatted discounted price
productSchema.virtual('formattedDiscountedPrice').get(function() {
    if (this.discountedPrice) {
        return `PKR ${this.discountedPrice.toLocaleString()}`;
    }
    return null;
});

// Method to check if product is available
productSchema.methods.isAvailable = function() {
    return this.quantity > 0 && this.stockStatus !== 'Out of Stock';
};

// Method to get main image
productSchema.methods.getMainImage = function() {
    return this.images && this.images.length > 0 ? this.images[0] : null;
};

// Static method to find products by category
productSchema.statics.findByCategory = function(category) {
    return this.find({ category });
};

// Static method to find products in stock
productSchema.statics.findInStock = function() {
    return this.find({ stockStatus: { $in: ['In Stock', 'Low Stock'] } });
};

// Static method to find products by price range
productSchema.statics.findByPriceRange = function(minPrice, maxPrice) {
    return this.find({ 
        price: { 
            $gte: minPrice, 
            $lte: maxPrice 
        } 
    });
};

module.exports = mongoose.model('products', productSchema);