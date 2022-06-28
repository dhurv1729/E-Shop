import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from '../components/Rating'
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <div>
      <Card className='py-3 my-3 rounded card border-light' style={{height: "300px", "margin": "0px -0.5rem", "padding": "0rem"}}> 
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image}  style={{width: "auto", height: "125px", "display": "block", "margin-left": "auto", "margin-right": "auto"}} />
        </Link>
        <Card.Body style={{"margin": "0px -7px"}}>
        <Link to={`/product/${product._id}`} style={{"text-decoration": "none", "font-weight": "500"}}>
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
