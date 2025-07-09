// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: false, unique: false, index: true },

  products: [{
    id : {type : String},
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    category: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    images: {
      type: Array,
    }
  }],

  customer: {
    email: { type: String, required: true },
    name: { type: String, default: null },
    phone: { type: String, default: null }
  },

  shippingAddress: {
    line1: { type: String, required: true },
    line2: { type: String, default: null },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },

  discount: {
    code: {
      type: String,
      default: null
    },
    type: {
      type: String,
      enum: ['percentage', 'fixed', 'shipping'], // Match with frontend discount types
    },
    value: {
      type: Number,
      default: null
    },
    id: {
      type: String
    }
  },
  
  // Order financial details
  subtotal: {
    type: Number,
    required: false
  },
  shipping: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: null
  },
  paymentMethod : {
    type: String,
    default : 'COD'
  },
  
  // Order status
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Failed', 'Refunded'],
    default: 'Pending'
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
}, {
  timestamps: false
});


module.exports = mongoose.model('Order', OrderSchema);