import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authMiddleware.js';

const getProducts = asyncHandler(async(req, res) => {
  const product = await Product.find({});
  res.json(product);
})

const getProductById = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) res.json(product);
  else {
    res.status(404);
    throw new Error('Product is not found');
  }
})

export const deleteProductById = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) {
    await product.remove();
    res.json({message: 'product deleted successfully'})
  }
  else {
    res.status(404)
    throw new Error('product not found');
  }
  res.json(products);
    
})

export const createProduct = asyncHandler(async(req, res) => {
  const product = new Product({
    name: 'sample',
    price: 0,
    user: req.user._id,
    rating: 0,
    description: 'sample',
    brand: 'sample',
    numReviews: 0,
    image: '/images/sample/jpg',
    countInStock: 0,
    category: 'sample'
  })
  const savedProduct = await product.save();
  res.json(savedProduct);
})

export const updateProduct = asyncHandler(async(req, res) => {

  const {price, name, countInStock, description, brand, image, category} = req.body
  const product = await Product.findById(req.params.id);

  if(product) {
    product.name = name,
    product.price = price,
    product.countInStock = countInStock,
    product.description = description,
    product.brand = brand,
    product.image = image,
    product.category = category

    const savedProduct = await product.save();
    res.json(savedProduct);
  }
  else {
    res.status(404)
    throw new Error('Product Not found');
  }
  
  
})

export const createProductReview = asyncHandler(async(req, res) => {

  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id);

  if(product) {
    const alreadyExist = product.reviews.find(r => r.user.toString() == req.user._id.toString())
    if(alreadyExist) {
      res.status(404)
      throw new Error('Product already reviewed')
    }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
      }


    product.reviews.push(review);
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => item.rating+acc, 0) / product.reviews.length

    await product.save()

    res.status(201).json({message: "Review Added"})
  }
  else {
    res.status(404)
    throw new Error('Product Not found');
  }

})


export { getProducts, getProductById}   