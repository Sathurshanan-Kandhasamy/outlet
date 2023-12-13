import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo: USER_INFO } = useSelector((state) => state.authentication);

  return USER_INFO ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
