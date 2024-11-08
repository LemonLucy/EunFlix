import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../../store/actions/authActions';
import useLogin from '../../hooks/useLogin';
import '../../pages/Login/Login.css'; 
import { Button,Checkbox  } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';

const Login = ({ toggleCard }) => {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state) => state.auth);
  const { login } = useLogin();

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Check if there's a remembered email and password in localStorage
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    if (rememberedEmail && rememberedPassword) {
      dispatch(setEmail(rememberedEmail));
      dispatch(setPassword(rememberedPassword));
      setRememberMe(true);
    }
  }, [dispatch]);

  const onSubmit = () => {
    console.log("Email:", email); // email 값 확인
    console.log("Password:", password);
    login(email, password, rememberMe);
  };

  return (
    <div className="auth-form">
      <h1 className="auth-title">Sign In</h1>
      <input
        className="auth-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          dispatch(setEmail(e.target.value));
        }}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          dispatch(setPassword(e.target.value));

        }}
      />
      <Checkbox
        isChecked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
        color={'brown'}
        colorScheme="brown"
      >
        Remember Me
      </Checkbox>
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