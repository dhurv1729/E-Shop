import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from '../components/Rating'

const Product = ({ product }) => {
  return (
    <div>
      <Card className='my-3 p-3 rounded' style={{height: "325px"}}> 
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image}  style={{width: "auto", height: "150px"}} />
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
        &#8377;{product.price}
        </Card.Text>

        </Card.Body>
      </Card>

    </div>
  );
}

export default Product;
