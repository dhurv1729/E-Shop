import React, { useState, useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import { Form, Button } from 'react-bootstrap'
import { getUserDetails, updateUser } from '../actions/userAction'
import { listProduct, updateProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FromContainer'

const ProductEditScreen = () => {

  const { product, error, loading } = useSelector(state => state.productDetail);

  const [message, setMessage] = useState(null)
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [brand, setBrand] = useState(product.brand)
  const [image, setImage] = useState(product.image)
  const [description, setDescription] = useState(product.description)
  const [countInStock, setCountInStock] = useState(product.countInStock)
  const [category, setCategory] = useState(product.category)

  
  const dispatch = useDispatch()
  const nevigate = useNavigate()

  const params = useParams();
  const productId = params.id;

  const { success: successUpdate} = useSelector(state => state.productUpdate);

  useEffect(() => {

    if(successUpdate) {
      dispatch({type: 'PRODUCT_UPDATE_RESET'})
      nevigate('/admin/productslist');
    } 

    else {
      if(!product.name || product._id != params.id) {
        dispatch(listProduct(params.id))
      } 
      else {
        setName(product.name)
        setPrice(product.price)
        setBrand(product.brand)
        setImage(product.image)
        setDescription(product.description)
        setCountInStock(product.countInStock)
        setCategory(product.category)
      }
    }

    
  }, [successUpdate, productId, dispatch, product])


  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(updateProduct({
      _id: params.id, name, image, countInStock, category, description, brand, price
    }))
    
  }



  return (

    <>

    <Link to='/admin/productslist' className='btn btn-light my-3'>Go Back</Link>

    <FormContainer>
      <h1>Edit Product</h1>


      {loading ? 'Loading...' : error ? <Message variant='danger'>{error}</Message> : (
        <Form onSubmit={submitHandler}>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicprice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicbrand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Product brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasiccountInStock">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Product countInStock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicimage">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Image Url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasiccategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicdescription">
          <Form.Label>Dscription</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        

        <Button variant="success" type="submit">
          Edit
        </Button>
      </Form>
      )}

      

      
      </FormContainer>

    </> 
  )
}

export default ProductEditScreen

