import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { SAVE_SHIPPING_ADDRESS } from '../slices/cart';
import CheckoutSteps from '../components/CheckoutSteps';

const Shipping = () => {
  const CART = useSelector((state) => state.cart);
  const { shippingAddress: SHIPPING_ADDRESS } = CART;

  const [ADDRESS, SET_ADDRESS] = useState(SHIPPING_ADDRESS?.address || '');
  const [CITY, SET_CITY] = useState(SHIPPING_ADDRESS?.city || '');
  const [POSTAL_CODE, SET_POSTAL_CODE] = useState(
    SHIPPING_ADDRESS?.postalCode || ''
  );
  const [COUNTRY, SET_COUNTRY] = useState(SHIPPING_ADDRESS?.country || '');

  const NAVIGATE = useNavigate();
  const DISPATCH = useDispatch();

  const SUBMIT_HANDLER = (event) => {
    event.preventDefault();
    DISPATCH(
      SAVE_SHIPPING_ADDRESS({
        address: ADDRESS,
        city: CITY,
        postalCode: POSTAL_CODE,
        country: COUNTRY,
      })
    );
    NAVIGATE('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps stepOne stepTwo />
      <h1>Shipping</h1>
      <Form onSubmit={SUBMIT_HANDLER}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={ADDRESS}
            onChange={(event) => SET_ADDRESS(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={CITY}
            onChange={(event) => SET_CITY(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={POSTAL_CODE}
            onChange={(event) => SET_POSTAL_CODE(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={COUNTRY}
            onChange={(event) => SET_COUNTRY(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
