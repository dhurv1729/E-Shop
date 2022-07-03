import { React, useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { listProduct, createReview } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";

const ProductScreen = ({ match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading, error } = productDetail;

  const { success, error: errorReview } = useSelector(
    (state) => state.createReview
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const addReviewHandler = () => {
    dispatch(createReview(
      id, { rating, comment },
    ));
  };

  useEffect(() => {
    if(success) {
      setRating(0)
      setComment('')
      dispatch({type: 'PRODUCT_CREATE_REVIEW_RESET'})
    }
    dispatch(listProduct(id));
  }, [success]);

  return (
    <div>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>

      {loading ? (
        "Loading"
      ) : error ? (
        error
      ) : product ? (
        <>
          <Row>
            <Col md={5}>
              <Image
                src={product.image}
                fluid
                style={{
                  width: "350px",
                  height: "350px",
                  "object-fit": "contain",
                  display: "block",
                  "margin-left": "auto",
                  "margin-right": "auto",
                }}
              ></Image>
            </Col>

            <Col md={4}>
              <ListGroup.Item variant="flush">
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={product.numReviews} />
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col style={{ "font-weight": "600" }}>Brand: </Col>
                  <Col>{product.brand}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <div style={{ "font-weight": "600" }}>
                  About this product:
                </div>{" "}
                {product.description}
              </ListGroup.Item>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup.Item variant="flush">
                  <Row>
                    <Col style={{ "font-weight": "600" }}>Price:</Col>
                    <Col>&#8377;{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col style={{ "font-weight": "600" }}>Stoke:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stoke"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col style={{ "font-weight": "600" }}>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-success mx-2"
                      type="button"
                      disabled={product.countInStock == 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </button>
                  </div>
                </ListGroup.Item>
              </Card>
            </Col>
          </Row>

          <Row className="my-4">
            <Col md={6}>
              {product.reviews.length == 0 ? (
                <Message variant="info">No reviews</Message>
              ) : (
                <>
                  <ListGroup variant="flush">
                    {product.reviews.map((r) => (
                      <ListGroup.Item>
                        {r.name}
                        <Rating value={r.rating} />
                        {r.comment}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              )}
<ListGroup>
<ListGroup.Item>
                      {!userInfo ? (
                        <>
                          <Link to="/login">Sing in</Link> to write review
                        </>
                      ) : (
                        <>
                        {errorReview && <Message variant='danger'>{errorReview}</Message>}
                        Write a Review
                        <Form onSubmit={addReviewHandler}>
                          <Form.Select
                            aria-label="1-Poor"
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option>Open this select menu</option>
                            <option value="1">1-Poor</option>
                            <option value="2">2-Fair</option>
                            <option value="3">3-Good</option>
                            <option value="4">4-Very Good</option>
                            <option value="5">5-Excellent</option>
                          </Form.Select>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasiccomment"
                          >
                            <Form.Label></Form.Label>
                            <Form.Control
                              type="name"
                              placeholder="Enter your comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </Form.Group>

                          <Button variant="success" type="submit">
                            Post
                          </Button>
                        </Form>
                        </>
                      )}
                    </ListGroup.Item>
                    </ListGroup>
            </Col>
          </Row>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default ProductScreen;
