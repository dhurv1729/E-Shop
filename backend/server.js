import express, { response } from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import {notFound, errorHandler} from "./middleware/errohandler.js";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/api', (req, res) => {
  res.send('Hello world');
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
});






app.use(notFound)
app.use(errorHandler)



app.listen(5000, console.log('Server is running at port 5000'));
