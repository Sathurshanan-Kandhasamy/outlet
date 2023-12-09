import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const Login = () => {
  const [EMAIL, SET_EMAIL] = useState('');
  const [PASSWORD, SET_PASSWORD] = useState('');

  const SUBMIT_HANDLER = (event) => {
    event.preventDefault();
    console.log('Submit');
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={SUBMIT_HANDLER}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={EMAIL}
            onChange={(event) => SET_EMAIL(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={PASSWORD}
            onChange={(event) => SET_PASSWORD(event.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
