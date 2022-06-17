import {React, useState, useEffect} from 'react';
import {Row, Col, Container} from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios';

const HomeScreen = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      const { data }  = await axios.get('/api/products');
      console.log(data);
      setProducts(data);
    }
    fetchProducts();
  }, [])

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


