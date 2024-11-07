import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated)

  if (isAuthenticated) {
    // 로그인된 상태이면 Home 페이지로 리다이렉트
    return <Navigate to="/" />;
  }

  // 로그인되지 않은 상태면 children 컴포넌트를 렌더링
  return children;
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,  // children prop에 대한 유효성 검사 추가
  };

export default PublicRoute;
