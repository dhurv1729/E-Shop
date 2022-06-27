import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from '../components/Rating'
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <div>
      <Card className='my-3 p-3 rounded' style={{height: "300px"}}> 
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image}  style={{width: "auto", height: "125px"}} />
        </Link>
        <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating value={product.rating} text={product.numReviews}/>
        </Card.Text>

        <Card.Text>
        &#8377;{product.price}
        </Card.Text>

        </Card.Body>
      </Card>

    </div>
  );
}

export default Product;
