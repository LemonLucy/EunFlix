import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../../store/actions/authActions';
import useRegister from '../../hooks/useRegister'; // Register 훅 사용
import '../../pages/Login/Login.css'; // 스타일 적용

const Register = ({ toggleCard }) => {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state) => state.auth);
  const { register } = useRegister();

  const onSubmit = () => {
    register(email, password);
  };

  return (
    <div className="auth-form">
      <h1 className="auth-title">Sign Up</h1>
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
      <button className="auth-button" onClick={onSubmit}>Sign Up</button>
      <p className="auth-link" onClick={toggleCard}>
        Already have an account? <b>Sign in</b>
      </p>
    </div>
  );
};

Register.propTypes = {
  toggleCard: PropTypes.func.isRequired,
};

export default Register;