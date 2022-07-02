import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FromContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheakOut from '../components/CheakOut'

const ShippingScreen = () => {

  const dispatch = useDispatch()
  const { shippingAddress } = useSelector(state => state.cart)
  const nevigate = useNavigate();
  
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    nevigate('/payment')
  }

  return (
    <FormContainer>

      <CheakOut step1 step2/>

      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>

        <Form.Group className="mb-3" controlId="formBasicaddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasiccity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicpostalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasiccountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' className='btn-success'> Continue</Button>
        
        
      </Form>
    </FormContainer>

  )
}

export default ShippingScreen
