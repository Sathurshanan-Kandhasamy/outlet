import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { SAVE_PAYMENT_METHOD } from '../slices/cart';

const Payment = () => {
  const [PAYMENT_METHOD, SET_PAYMENT_METHOD] = useState('PayPal');

  const DISPATCH = useDispatch();
  const NAVIGATE = useNavigate();

  const CART = useSelector((state) => state.cart);
  const { shippingAddress: SHIPPING_ADDRESS } = CART;

  useEffect(() => {
    if (!SHIPPING_ADDRESS.address) {
      NAVIGATE('/shipping');
    }
  }, [SHIPPING_ADDRESS, NAVIGATE]);

  const SUBMIT_HANDLER = (event) => {
    event.preventDefault();
    DISPATCH(SAVE_PAYMENT_METHOD(PAYMENT_METHOD));
    NAVIGATE('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps stepOne stepTwo stepThree />
      <h1>Payment Method</h1>
      <Form onSubmit={SUBMIT_HANDLER}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit Cart"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(event) => SET_PAYMENT_METHOD(event.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Payment;
