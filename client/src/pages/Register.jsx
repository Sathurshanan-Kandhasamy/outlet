import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApi';
import { SET_CREDENTIALS } from '../slices/authentication';
import { toast } from 'react-toastify';

const Register = () => {
  const [EMAIL, SET_EMAIL] = useState('');
  const [NAME, SET_NAME] = useState('');
  const [PASSWORD, SET_PASSWORD] = useState('');
  const [CONFIRM_PASSWORD, SET_CONFIRM_PASSWORD] = useState('');

  const DISPATCH = useDispatch();
  const NAVIGATE = useNavigate();

  const [register, { isLoading: IS_LOADING }] = useRegisterMutation();

  const { userInfo: USER_INFO } = useSelector((state) => state.authentication);

  const { search: SEARCH } = useLocation();
  const SEARCH_PARAMS = new URLSearchParams(SEARCH);
  const REDIRECT = SEARCH_PARAMS.get('redirect') || '/';

  useEffect(() => {
    if (USER_INFO) {
      NAVIGATE(REDIRECT);
    }
  }, [USER_INFO, REDIRECT, NAVIGATE]);

  const SUBMIT_HANDLER = async (event) => {
    event.preventDefault();
    if (CONFIRM_PASSWORD !== PASSWORD) {
      toast.error('Passwords do not match.');
      return;
    } else {
      try {
        const RESPONSE = await register({
          email: EMAIL,
          name: NAME,
          password: PASSWORD,
        }).unwrap();
        DISPATCH(SET_CREDENTIALS({ ...RESPONSE }));
        NAVIGATE(REDIRECT);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={SUBMIT_HANDLER}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={NAME}
            onChange={(event) => SET_NAME(event.target.value)}
          />
        </Form.Group>
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
        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={CONFIRM_PASSWORD}
            onChange={(event) => SET_CONFIRM_PASSWORD(event.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={IS_LOADING}
        >
          Register
        </Button>
        {IS_LOADING && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account?{' '}
          <Link to={REDIRECT ? `/login?redirect=${REDIRECT}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
