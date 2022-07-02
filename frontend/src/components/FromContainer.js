import React, { Children } from 'react';
import { Container, Row, Col} from 'react-bootstrap';

const FromContainer = ({ children }) => {
  return (
    <div>
      <Container className='my-5'>
        <Row className='justify-content-md-center'>
          <Col xs='12' md='6'>
            {children}
          </Col>
        </Row>  
      </Container>      
    </div>
  );
}

export default FromContainer;
