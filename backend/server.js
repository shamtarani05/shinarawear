const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/mongodb-config');
const authRoutes = require('./src/routes/auth-routes');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const orderRouter = require('./src/routes/ordersRoutes');
const customerRouter = require('./src/routes/customerRoutes');
const analyticsRouter = require('./src/routes/analyticsRoutes');
const productRouter = require('./src/routes/productRoutes');
const reviewRouter = require('./src/routes/reviewRoutes');
const topSalesRouter = require('./src/routes/topSalesRoutes')
const couponRoutes = require('./src/routes/coupon-routes');

dotenv.config();

app.use(helmet());

app.use(cors({
  origin: "https://shinarawear.vercel.app/", 
  credentials: true ,
}));
app.use(express.json({ limit: '10mb' })); // Increase limit for larger requests
app.use(cookieParser());

const port = process.env.PORT || 3000;
connectDB();

app.use('/auth',authRoutes); 
app.use('/orders', orderRouter);
app.use('/customers', customerRouter);
app.use('/dashboard', analyticsRouter);
app.use('/products', productRouter);
app.use('/reviews', reviewRouter); 
app.use('/sales', topSalesRouter);
app.use('/api/coupons', couponRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
