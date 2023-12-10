import { useNavigate } from 'react-router-dom';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApi';
import { LOGOUT } from '../slices/authentication';

const Header = () => {
  const { cartItems: CART_ITEMS } = useSelector((state) => state.cart);
  const { userInfo: USER_INFO } = useSelector((state) => state.authentication);

  const [logoutApiCall] = useLogoutMutation();

  const DISPATCH = useDispatch();
  const NAVIGATE = useNavigate();

  const LOGOUT_HANDLER = async () => {
    try {
      await logoutApiCall().unwrap();
      DISPATCH(LOGOUT());
      NAVIGATE('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Outlet</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-bav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {CART_ITEMS.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                      {CART_ITEMS.reduce(
                        (accumulator, currentItem) =>
                          accumulator + currentItem.qty,
                        0
                      )}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {USER_INFO ? (
                <NavDropdown title={USER_INFO.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={LOGOUT_HANDLER}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
