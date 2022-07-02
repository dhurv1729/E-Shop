import React from 'react';
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

const CheakOut = ({step1, step2, step3, step4}) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (<LinkContainer to='/login' className='text-info' style={{'font-weight': '500'}}><Nav.Link>Sing In</Nav.Link></LinkContainer>) : (<Nav.Link disabled>Sing In</Nav.Link>)}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (<LinkContainer to='/shipping' className='text-info' style={{'font-weight': '500'}}><Nav.Link>Shipping</Nav.Link></LinkContainer>) : (<Nav.Link disabled>Shipping</Nav.Link>)}
      </Nav.Item> 
      <Nav.Item>
        {step3 ? (<LinkContainer to='/payment' className='text-info' style={{'font-weight': '500'}}><Nav.Link>Payment</Nav.Link></LinkContainer>) : (<Nav.Link disabled>Payment</Nav.Link>)}
      </Nav.Item>
      <Nav.Item> 
        {step4 ? (<LinkContainer to='/placeorder' className='text-info' style={{'font-weight': '500'}}><Nav.Link>Place Order</Nav.Link></LinkContainer>) : (<Nav.Link disabled>Place Order</Nav.Link>)}
      </Nav.Item>
    </Nav>
  );
}


export default CheakOut;
