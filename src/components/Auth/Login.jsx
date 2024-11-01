import PropTypes from 'prop-types';
import '../../pages/Login/Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setError, loginSuccess } from '../../store/actions/authActions';
import useShowToast from '../../hooks/useShowToast';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useEffect } from 'react';

const Login = ({toggleCard}) => {
  const dispatch = useDispatch();
  const showToast=useShowToast();
  const navigate = useNavigate();
  const { email, password, error } = useSelector((state) => state.auth);
  const [storedUser] = useLocalStorage('user'); // 'user' 데이터를 불러옴
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated');

  //로그인 시 localstorage와 redux상태 업데이트
  const onSubmit = () => {
    if (storedUser && email === storedUser.email && password === storedUser.password) {
      //redux 상태 업데이트
      dispatch(loginSuccess());
      setIsAuthenticated(true);

      //localstorage에 로그인상태 업데이트
      localStorage.setItem('isAuthenticated',true);

      navigate('/');
    } else {
      dispatch(setError("Email and password are required"));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // 로그인 상태가 true로 변경되면 Home으로 리디렉션
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      showToast("Error", error, "error");
      dispatch(setError(null));
    }
  }, [error,dispatch]);

  return (
    <div className="login-card" id="login">
      <h1>Sign In</h1>
      <div className={`input`}>
        <input id="email" type="email" placeholder="Email" value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))} />
        <label htmlFor="email"></label>
      </div>
      <div className={`input`}>
        <input id="password" type="password" placeholder="Password" value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))} />
        <label htmlFor="password"></label>
      </div>
      {error && <p className="error-message">{error}</p>}
      <span className="checkbox remember">
        <input type="checkbox" id="remember" />
        <label htmlFor="remember" className="read-text">Remember me</label>
      </span>
      <span className="checkbox forgot">
        <a href="#">Need help?</a>
      </span>
      <button onClick={onSubmit}>Sign In</button>
      <a href="#" className="account-check" onClick={toggleCard}>
        New to Netflix? <b>Sign up now</b>
      </a>
    </div>
  );
};
Login.propTypes = {
  toggleCard: PropTypes.func.isRequired,  // Prop validation added here
};

export default Login;