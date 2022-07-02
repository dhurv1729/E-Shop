import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import axios from "axios";

const OrderScreen = () => {
  const { error, loading, order } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);

  const params = useParams();

  ;

  useEffect(() => {
    
    dispatch(getOrderDetails(params.id))

  }, [dispatch, params.id]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(params.id, paymentResult));
  };

  return (
    <div>
      {" "}
      {error ? (
        <Message>{error}</Message>
      ) : loading ? (
        "Loading..."
      ) : (
        <>
          <h1>{order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <h2>SHIPPING</h2>
                  <p>
                    <strong>Name:</strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong>
                    {order.user.email}
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}{" "}
                  </p>

                  <p>
                    {order.isDelivered ? (
                      <Message variant="success">
                        Delevered On {order.deliveredAt}
                      </Message>
                    ) : (
                      <Message variant="danger">Not deleverd</Message>
                    )}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>PAYMENT METHOD</h2>
                  <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}{" "}
                  </p>
                  <p>
                    {order.isPaid ? (
                      <Message variant="success">
                        Paid On {order.paidAt}
                      </Message>
                    ) : (
                      <Message variant="danger">Not Paid</Message>
                    )}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>ORDERED ITEMS</h2>
                  {order.orderItems.length == 0 ? (
                    <Message>Your order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, idx) => (
                        <ListGroup.Item>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  "object-fit": "contain",
                                }}
                              ></Image>
                            </Col>
                            <Col md={7}>
                              <Link
                                to={`/product/${item.product}`}
                                style={{ "text-decoration": "none" }}
                                className="text-info"
                              >
                                {item.name}{" "}
                              </Link>
                            </Col>

                            <Col md={4}>
                              {item.qty}x &#8377;{item.price}= &#8377;{" "}
                              {item.qty * item.price}{" "}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}{" "}
                    </ListGroup>
                  )}{" "}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup.Item>
                  <h2 style={{ textAlign: "center" }}>Ordered summary</h2>
                </ListGroup.Item>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items:</Col>
                      <Col>&#8377; {order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping:</Col>
                      <Col>
                        {" "}
                        {order.itemsPrice < 1000 ? (
                          <span>&#8377; {order.shippingPrice}</span>
                        ) : (
                          "Free delevery"
                        )}{" "}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>&#8377; {order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total:</Col>
                      <Col>{order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {" "}
                    {error && <Message>{error}</Message>}{" "}
                  </ListGroup.Item>

                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}{" "}
    </div>
  );
};

export default OrderScreen;
