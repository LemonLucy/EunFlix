import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../../store/actions/authActions';
import useLogin from '../../hooks/useLogin';
import '../../pages/Login/Login.css'; 
import { Button  } from '@chakra-ui/react';

const Login = ({ toggleCard }) => {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state) => state.auth);
  const { login } = useLogin();

  const onSubmit = () => {
    login(email, password);
  };

  return (
    <div className="auth-form">
      <h1 className="auth-title">Sign In</h1>
      <input
        className="auth-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
      />
      {error && <p className="login-error-message">{error}</p>}
      
      
        <Button
          className="auth-button"
          onClick={onSubmit}
          colorScheme="#a68064"
        >
          Log In
        </Button>
      
      <p className="auth-link" onClick={toggleCard}>
        Dont have an account? <b>Sign up</b>
      </p>
    </div>
  );
};

Login.propTypes = {
  toggleCard: PropTypes.func.isRequired,
};

export default Login;