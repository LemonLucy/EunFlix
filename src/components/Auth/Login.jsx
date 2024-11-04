import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setError, loginSuccess } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useEffect } from 'react';
import '../../pages/Login/Login.css';

const Login = ({ toggleCard }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, error } = useSelector((state) => state.auth);
  const [storedUser] = useLocalStorage('user'); 
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated');

  const onSubmit = () => {
    if (!email || !password) {
      dispatch(setError("Email and password are required"));
      return;
    }

    if (storedUser && email === storedUser.email && password === storedUser.password) {
      dispatch(loginSuccess());
      if (!isAuthenticated) setIsAuthenticated(true);
      navigate('/');
    } else {
      dispatch(setError("Invalid email or password"));
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  return (
    <div className="custom-container">
      <h1 className="custom-title">Sign In</h1>
      <input
        className="custom-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
      />
      <input
        className="custom-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
      />
      {error && <p className="custom-error-message">{error}</p>}
      <div className="custom-checkbox-container">
        <input type="checkbox" className="custom-checkbox" id="remember" />
        <label htmlFor="remember" className="custom-checkbox-label">Remember me</label>
      </div>
      <button className="custom-button" onClick={onSubmit}>Sign In</button>
      <p className="custom-link" onClick={toggleCard}>
        New to Netflix? <b>Sign up now</b>
      </p>
    </div>
  );
};

Login.propTypes = {
  toggleCard: PropTypes.func.isRequired,
};

export default Login;
