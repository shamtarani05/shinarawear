const Order = require('../models/order-schema');
const Payment = require('../models/payment-schema');
const OrderEmailNotification = require('../utils/OrderEmailNotification');
const generatePaymentId = require('../utils/generateIds').generatePaymentId;

/**
 * Verify payment status for an order
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Find the order
    const order = await Order.findOne({ orderId: orderId });
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    // Find the payment
    const payment = await Payment.findOne({ orderId: orderId });
    
    res.status(200).json({
      success: true,
      order: {
        orderId: order.orderId,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt
      },
      payment: payment ? {
        paymentId: payment.paymentId,
        status: payment.status,
        amount: payment.amount,
        createdAt: payment.createdAt
      } : null
    });
    
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Error verifying payment', error: error.message });
  }
};

/**
 * Get order details
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(`Fetching order with ID: ${orderId}`);

    // Try to find by orderId first
    let order = await Order.findOne({ orderId: orderId });

    // If not found, try MongoDB _id or custom id field
    if (!order) {
      if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
        order = await Order.findById(orderId);
      } else {
        order = await Order.findOne({ id: orderId });
      }
    }
    
    if (!order) {
      console.log(`Order not found: ${orderId}`);
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    console.log(`Order found: ${order.orderId}`);
    res.status(200).json({
      success: true,
      order
    });
    
  } catch (error) {
    console.error('Error getting order details:', error);
    res.status(500).json({ success: false, message: 'Error retrieving order details', error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // Sort orders by createdAt in descending order (newest first)
    const orders = await Order.find({}).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: 'No Orders Yet' });
    }

    res.status(200).json(orders);
  } catch(error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ success: false, message: 'Error retrieving orders', error: error.message });
  }
};

/**
 * Get orders by customer email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getCustomerOrders = async (req, res) => {
  try {
    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Customer email is required' });
    }
    
    const orders = await Order.find({ 
      'customer.email': email 
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: orders.length,
      orders: orders.map(order => ({
        orderId: order.orderId,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
        items: order.items.length
      }))
    });
    
  } catch (error) {
    console.error('Error getting customer orders:', error);
    res.status(500).json({ success: false, message: 'Error retrieving customer orders', error: error.message });
  }
};

/**
 * Get payment details for an order
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getPaymentByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(`Fetching payment for orderId: ${orderId}`);
    
    // Find payment by orderId
    const payment = await Payment.findOne({ orderId });
    
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment information not found' });
    }
    
    res.status(200).json({
      success: true,
      payment
    });
    
  } catch (error) {
    console.error('Error getting payment details:', error);
    res.status(500).json({ success: false, message: 'Error retrieving payment details', error: error.message });
  }
};

/**
 * Update order status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    order.status = status;
    order.updatedAt = new Date();
    await order.save();
    // If cancelled, delete payment
    if (status === 'Cancelled') {
      await Payment.deleteOne({ orderId });
    }
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: {
        orderId: order.orderId,
        status: order.status,
        updatedAt: order.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Error updating order status', error: error.message });
  }
};

// Create a new order (COD only)
const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    // Always generate a unique orderId if not provided
    if (!orderData.orderId) {
      orderData.orderId = 'ORD-' + Date.now() + '-' + Math.floor(1000 + Math.random() * 9000);
    }
    orderData.paymentMethod = 'COD';
    orderData.status = 'Pending';
    orderData.createdAt = new Date();
    orderData.updatedAt = new Date();

    // Ensure required fields for invoice/email
    orderData.products = (orderData.items || orderData.products || []).map(item => ({
      ...item,
      color: item.color || '',
      size: item.size || '',
    }));
    orderData.shippingAddress = orderData.address || orderData.shippingAddress || {};
    orderData.subtotal = orderData.subtotal || (orderData.products.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    orderData.total = orderData.total || (orderData.subtotal + (orderData.shipping || 0) + (orderData.tax || 0) - (orderData.discount || 0));

    // Map address fields to shippingAddress fields for required backend schema
    if (orderData.address) {
      orderData.shippingAddress = {
        line1: orderData.address.street,
        line2: orderData.address.line2 || '',
        city: orderData.address.city,
        state: orderData.address.state,
        postalCode: orderData.address.postalCode,
        country: orderData.address.country,
      };
    }

    // Ensure customer object and email are always present
    if (!orderData.customer || !orderData.customer.email) {
      // Try to build from request body
      orderData.customer = {
        email: orderData.email || (orderData.address && orderData.address.email) || '',
        name: orderData.address?.name || '',
        phone: orderData.address?.phone || '',
      };
    }
    // Fallback: if still no email, reject
    if (!orderData.customer.email) {
      return res.status(400).json({ success: false, message: 'Customer email is required for order.' });
    }

    // Create order
    const newOrder = new Order(orderData);
    await newOrder.save();

    // Create payment
    const payment = new Payment({
      paymentId: generatePaymentId(),
      orderId: newOrder.orderId || newOrder._id,
      amount: newOrder.total,
      currency: 'PKR',
      paymentMethod: 'COD',
      status: 'Pending',
      customer: newOrder.customer,
      createdAt: new Date(),
    });
    await payment.save();

    // Send confirmation email
    try {
      await OrderEmailNotification.sendOrderConfirmationEmail({
        ...newOrder.toObject(),
        paymentDetails: payment.toObject(),
        products: newOrder.products,
        shippingAddress: newOrder.shippingAddress,
        subtotal: newOrder.subtotal,
        total: newOrder.total
      });
    } catch (emailErr) {
      console.error('Failed to send order confirmation email:', emailErr);
    }

    res.status(201).json({
      success: true,
      order: newOrder,
      payment
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Error creating order', error: error.message });
  }
};

module.exports = {
  verifyPayment,
  getOrderDetails,
  getCustomerOrders,
  getAllOrders,
  getPaymentByOrderId,
  updateOrderStatus,
  createOrder
};