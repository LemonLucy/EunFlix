import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

  // if (isAuthenticated === null || isAuthenticated === undefined) {
  //   return <div>Loading...</div>; // 로딩 화면 표시
  // }

  return isAuthenticated ? children : <Navigate to="/login" />;
};


PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,  // children prop에 대한 유효성 검사 추가
  };

export default PrivateRoute;
