import React from 'react';
import products from '../products';
import {Row, Col, Container} from 'react-bootstrap'
import Product from '../components/Product'
const HomeScreen = () => {

  console.log(products);
  return (
    <div>
      <Container>
        <h1>Latest Products</h1>

        <Row>
          {products.map(product => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
            </Col>
          ))}
        </Row>  
      </Container>
      
    </div>
  );
}

export default HomeScreen;


