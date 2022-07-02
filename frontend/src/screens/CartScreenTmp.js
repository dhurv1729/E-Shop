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

const CartScreenTmp = () => {
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
    nevigate("/login?redirect=shipping");
  };

  return (
    <Row>
      <h1>Shopping Cart</h1>

      <Col md={8}>
        {cartItems.length == 0 ? (
          <Message>
            Your cart is empty &nbsp; <Link to={"/"}>Go Back</Link>
          </Message>
        ) : (
          <ListGroup.Item varient="flush">
            {cartItems.map((item) => (
              <Row>
                <Col md={3} style={{ margin: "0rem 0rem 1.5rem 0rem" }}>
                  <Image
                    src={item.image}
                    style={{
                      width: "115px",
                      height: "115px",
                      "object-fit": "contain",
                    }}
                    fluid
                    rounded
                  ></Image>
                </Col>

                <Col>
                  <Row className="py-1">
                    <Col md={10} style={{ "font-weight": "500" }}>
                      <Link
                        to={`/product/${item.product}`}
                        style={{ "text-decoration": "none" }}
                        className='text-info'
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2} style={{ "font-weight": "600" }}>
                      &#8377; {item.price}
                    </Col>
                  </Row>

                  <Row className="py-1">
                    <Col md={4} style={{ "font-weight": "500" }}>
                      By {item.brand}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
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
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        {" "}
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                    <Col md={3}></Col>
                  </Row>
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
              <span style={{ "font-weight": "500" }}>
                &#8377;{" "}
                {cartItems.reduce(
                  (acc, item) => acc + Number(item.qty) * Number(item.price),
                  0
                )}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-success mx-2"
                  type="button"
                  disabled={cartItems.length == 0}
                  onClick={checkOutHandler}
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

export default CartScreenTmp;
