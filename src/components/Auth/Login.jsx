import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../../store/actions/authActions';
import '../../pages/Login/Login.css';
import { Button, Checkbox } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import KakaoLogin from './KakaoLogin';
import useLogin from '../../hooks/useLogin';

const Login = ({ toggleCard }) => {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state) => state.auth);
  const { login } = useLogin();

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    if (rememberedEmail && rememberedPassword) {
      dispatch(setEmail(rememberedEmail));
      dispatch(setPassword(rememberedPassword));
      setRememberMe(true);
    }
  }, [dispatch]);

  const onSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    login(email, password, rememberMe);
  };

  const handleToggleCard = () => {
    if (toggleCard) {
      toggleCard();
    } else {
      console.warn('toggleCard is not provided');
    }
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
      <Checkbox
        isChecked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
        color={'brown'}
        colorScheme="brown"
      >
        Remember Me
      </Checkbox>
      {error && <p className="login-error-message">{error}</p>}
      <Button className="auth-button" onClick={onSubmit} colorScheme="#a68064">
        Log In
      </Button>

      {/* 카카오 로그인 버튼 */}
      <KakaoLogin />

      <p className="auth-link" onClick={handleToggleCard}>
        Dont have an account? <b>Sign up</b>
      </p>
    </div>
  );
};

Login.propTypes = {
  toggleCard: PropTypes.func,
};

Login.defaultProps = {
  toggleCard: null,
};

export default Login;
