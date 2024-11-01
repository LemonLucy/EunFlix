import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // if (isAuthenticated === null || isAuthenticated === undefined) {
  //   return <div>Loading...</div>; // 로딩 화면 표시
  // }

  // 로그인 상태가 아니면 Login 페이지로 리디렉션
  return isAuthenticated ? children : <Navigate to="/login" />;
};


PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,  // children prop에 대한 유효성 검사 추가
  };

export default PrivateRoute;
