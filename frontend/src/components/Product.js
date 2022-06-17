import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from '../components/Rating'

const Product = ({ product }) => {
  return (
    <div>
      <Card className='my-3 p-3 rounded'> 
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image} />
        </a>
        <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong style={{color: "rgb(50, 100, 150)"}}>{product.name}</strong>      
          </Card.Title>
        </a>

        <Card.Text as='div'>
          <Rating value={product.rating} text={product.numReviews}/>
        </Card.Text>

        <Card.Text as='h5'>
          ${product.price}
        </Card.Text>

        </Card.Body>
      </Card>

    </div>
  );
}

export default Product;
