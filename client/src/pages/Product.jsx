import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetSingleProductQuery } from '../slices/productsApi';
import { ADD_TO_CART } from '../slices/cart';

const Product = () => {
  const { id: PRODUCT_ID } = useParams();

  const DISPATCH = useDispatch();
  const NAVIGATE = useNavigate();

  const [QUANTITY, SET_QUANTITY] = useState(1);

  const {
    data: PRODUCT,
    isLoading: IS_LOADING,
    error: ERROR,
  } = useGetSingleProductQuery(PRODUCT_ID);

  const ADD_TO_CART_HANDLER = () => {
    DISPATCH(ADD_TO_CART({ ...PRODUCT, qty: QUANTITY }));
    NAVIGATE('/cart');
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {IS_LOADING ? (
        <Loader />
      ) : ERROR ? (
        <Message variant="danger">
          {ERROR?.data?.message || ERROR.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={PRODUCT.image} alt={PRODUCT.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{PRODUCT.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={PRODUCT.rating}
                    text={`${PRODUCT.numberOfReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${PRODUCT.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {PRODUCT.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>${PRODUCT.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        <strong>
                          {PRODUCT.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {PRODUCT.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={QUANTITY}
                            onChange={(event) =>
                              SET_QUANTITY(Number(event.target.value))
                            }
                          >
                            {[...Array(PRODUCT.countInStock).keys()].map(
                              (number) => (
                                <option key={number + 1} value={number + 1}>
                                  {number + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={PRODUCT.countInStock === 0}
                      onClick={ADD_TO_CART_HANDLER}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
