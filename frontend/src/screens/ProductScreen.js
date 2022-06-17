import { React, useState, useEffect} from 'react';
import { Container, Row, Col, Image, Card, ListGroup, Button } from 'react-bootstrap';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import Rating from '../components/Rating'
import axios from 'axios';

const ProductScreen = ({match}) => {

  const { id } = useParams();

  const [product, setProduct] = useState([]);

  useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${id}`);
      console.log(data);
			setProduct(data);
		}
		fetchProduct();

	}, [])

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>Go back</Link>

      <Row>
        <Col md={6}>
          <Image src={product.image} fluid></Image>
        </Col>

        <Col md={3}>
          <ListGroup.Item variant='flush'><h2>{product.name}</h2></ListGroup.Item>
          <ListGroup.Item>
            <Rating value={product.rating} text={product.numReviews}/>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
            <Col>Brand: </Col>
            <Col>{product.brand}</Col>
          </Row>
          </ListGroup.Item>
          <ListGroup.Item>
          Description: {product.description}
          </ListGroup.Item>
        </Col>

        <Col>
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>${product.price}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Stoke:</Col>
              <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stoke'}</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item className='m-auto'>
            <Link to={`/cart/`}>
            <Button className='btn btn-primary mx-5 px-4' type='button' disabled={product.countInStock == 0}>
                Add to cart
            </Button>
            </Link>
        </ListGroup.Item>
        </Col>
      </Row>


    </div>
  );
}

export default ProductScreen;
