import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, Image, ListGroup, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheakOut from '../components/CheakOut'
import FormContainer from '../components/FromContainer'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  cart.itemsPrice = (cart.cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  )).toFixed(2)
  cart.taxPrice = (cart.itemsPrice * 0.15).toFixed(2);
  cart.shippingPrice = cart.itemsPrice > 1000 ? 0 : 40
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)).toFixed(2)

  const { order, success, loading, error } = useSelector(state => state.orderCreate)

  useEffect(() => {
    if(success) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success])

  const placeorderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
      paymentMethod: cart.paymentMethod
    }))
  }

  return (
    <div>
      <FormContainer>
        <CheakOut step1 step2 step3 step4 />
      </FormContainer>
      <Row style={{ 'margin-top': '-3rem' }}>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>ORDERED ITEMS</h2>
              {cart.cartItems.length == 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, idx) => (
                    <ListGroup.Item>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            style={{
                              width: '40px',
                              height: '40px',
                              'object-fit': 'contain',
                            }}
                          ></Image>
                        </Col>
                        <Col md={7}>
                          <Link
                            to={`/product/${item.product}`}
                            style={{ 'text-decoration': 'none' }}
                            className='text-info'
                          >
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x &#8377;{item.price} = &#8377;
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup.Item>
              <h2 style={{"textAlign": "center"}}>Ordered summary</h2>
            </ListGroup.Item>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col>&#8377; {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>
                    {cart.itemsPrice < 1000 ? (<span>&#8377; {cart.shippingPrice}</span>) : 'Free delevery'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>&#8377; {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success mx-2"
                    type="button"
                    onClick={placeorderHandler}
                  >
                    Place Order
                  </button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
