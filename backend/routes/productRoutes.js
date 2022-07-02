import express from "express";
import {getProducts, getProductById, deleteProductById, createProduct, updateProduct} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/delete/:id').delete(protect, admin, deleteProductById)
router.route('/create').post(protect, admin, createProduct);
router.route('/update/:id').put(protect, admin, updateProduct)
export default router;