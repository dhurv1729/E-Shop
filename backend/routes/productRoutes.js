import express from "express";
import products from "../products.js";
const router = express.Router();
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

router.get('/', asyncHandler (async(req, res) => {
  const product = await Product.find({});
  res.json(product);
}))

router.get('/:id', asyncHandler (async(req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) res.json(product);
  else {
    res.status(404);
    throw new Error('Product is not found');
  }
}))

export default router;