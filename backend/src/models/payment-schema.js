// models/Payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  // Custom payment ID
  paymentId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // Reference to order ID
  orderId: {
    type: String,
    required: true,
    index: true
  },
  
  // Payment details
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'PKR'
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['COD']
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Paid', 'Cancelled']
  },
  
  // Customer information
  customer: {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: null
    }
  },
  
  metadata: {
    type: Object,
    default: {}
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  }
}, { 
 
  timestamps: false 
});

module.exports = mongoose.model('Payment', PaymentSchema);