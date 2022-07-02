import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
  Image,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import Message from "../components/Message";

const CartScreen = () => {
  const params = useParams();
  const location = useLocation();
  const productId = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const nevigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    console.log("inside cheackout");
    nevigate("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length == 0 ? (
          <Message>
            Your cart is empty &nbsp; <Link to={"/"}>Go Back</Link>
          </Message>
        ) : (
          <ListGroup.Item varient="flush">
            {cartItems.map((item) => (
              <Row>
                <Col md={2}>
                  <Image
                    src={item.image}
                    style={{
                      width: "70px",
                      height: "70px",
                      "object-fit": "contain",
                    }}
                    fluid
                    rounded
                  ></Image>
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>&#8377; {item.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) => {
                      dispatch(addToCart(item.product, e.target.value));
                    }}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    {" "}
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>

                {cartItems[cartItems.length - 1].product != item.product && (
                  <hr></hr>
                )}
              </Row>
            ))}
          </ListGroup.Item>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup varient="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                items
              </h2>
              &#8377;{" "}
              {cartItems.reduce(
                (acc, item) => acc + Number(item.qty) * Number(item.price),
                0
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary mx-2"
                  type="button"
                  onSubmit={checkOutHandler}
                >
                  Procced To Checkout
                </button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
