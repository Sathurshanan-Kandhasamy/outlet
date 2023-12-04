import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { ADD_TO_CART } from '../slices/cart';

const Cart = () => {
  const NAVIGATE = useNavigate();
  const DISPATCH = useDispatch();

  const CART = useSelector((state) => state.cart);
  const { cartItems: CART_ITEMS } = CART;

  const ADD_TO_CART_HANDLER = async (product, quantity) => {
    DISPATCH(ADD_TO_CART({ ...product, qty: quantity }));
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {CART_ITEMS.length === 0 ? (
          <Message>
            Your cart is empty. <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {CART_ITEMS.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item._id}`}
                      style={{ color: 'black' }}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(event) =>
                        ADD_TO_CART_HANDLER(item, Number(event.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((number) => (
                        <option key={number + 1} value={number + 1}>
                          {number + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light">
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {CART_ITEMS.reduce(
                  (accumulator, currentItem) => accumulator + currentItem.qty,
                  0
                )}
                ) items
              </h2>
              $
              {CART_ITEMS.reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.qty * currentItem.price,
                0
              ).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={CART_ITEMS.length === 0}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
