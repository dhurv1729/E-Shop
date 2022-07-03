import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FromContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheakOut from "../components/CheakOut";
import FromContainer from "../components/FromContainer";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  const nevigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Case On Delivery");

  useEffect(() => {
    if (!shippingAddress) {
      nevigate("/shipping");
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    nevigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheakOut step1 step2 step3 />
      <h1>Payment </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Select Payment Method</Form.Label>

          <Form.Check
            checked
            className="mb-4"
            type="radio"
            label="Case On Delivery"
            id="Paypal or Credit card"
            name="paymentMethod"
            value="Case On Delivery"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          {/* <Form.Check
            className="mb-4"
            type="radio"
            label="Stripe"
            id="stripe"
            name='paymentMethod'
            value='Stripe'
            onChange={(e) => setPaymentMethod(e.target.value)}
          /> */}
        </Form.Group>

        <Button type="submit" className='btn btn-success'> Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
