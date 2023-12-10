import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApi';
import { SET_CREDENTIALS } from '../slices/authentication';
import { toast } from 'react-toastify';

const Login = () => {
  const [EMAIL, SET_EMAIL] = useState('');
  const [PASSWORD, SET_PASSWORD] = useState('');

  const DISPATCH = useDispatch();
  const NAVIGATE = useNavigate();

  const [login, { isLoading: IS_LOADING }] = useLoginMutation();

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
    try {
      const RESPONSE = await login({
        email: EMAIL,
        password: PASSWORD,
      }).unwrap();
      DISPATCH(SET_CREDENTIALS({ ...RESPONSE }));
      NAVIGATE(REDIRECT);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
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
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={IS_LOADING}
        >
          Sign In
        </Button>
        {IS_LOADING && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link
            to={REDIRECT ? `/register?${REDIRECT}=${REDIRECT}` : '/register'}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
