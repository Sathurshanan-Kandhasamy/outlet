import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from '../slices/productsApi';

const Home = () => {
  const {
    data: PRODUCTS,
    isLoading: IS_LOADING,
    error: ERROR,
  } = useGetProductsQuery();

  return (
    <>
      {IS_LOADING ? (
        <Loader />
      ) : ERROR ? (
        <Message variant="danger">
          {ERROR?.data?.message || ERROR.error}
        </Message>
      ) : (
        <>
          <Row>
            {PRODUCTS.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Home;
