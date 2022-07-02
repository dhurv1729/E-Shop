import {React, useEffect} from 'react';
import {Row, Col, Container} from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = () => {

  const dispatch = useDispatch();


  const productList = useSelector(state => state.productList);
  const {products, loading, error} = productList;


  useEffect(() => {
    dispatch(listProducts());  
  }, [dispatch])

  return (
    <div>
      <Container>
        <h1>Latest Products</h1>

        {loading ? 'Loading' : error ? error : 
        <Row >
          {products.map(product => (
            <Col md={2}>
              <Product product={product}/>
            </Col>
          ))}
        </Row>  
        }
      </Container>
      
    </div>
  );
}

export default HomeScreen;


