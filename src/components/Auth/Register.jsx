// Register.js
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setError } from '../../store/actions/authActions';
import { useEffect } from 'react';
import '../../pages/Login/Login.css';
const Register = ({ toggleCard }) => {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state) => state.auth);

  const onSubmit = () => {
    if (!email) {
      dispatch(setError("Email is required"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      dispatch(setError("Invalid email format"));
      return;
    }
    if (password.length < 6) {
      dispatch(setError("Password must be at least 6 characters"));
      return;
    }

    localStorage.setItem('user', JSON.stringify({ email, password }));
    alert("Account created successfully. Please log in.");
    toggleCard();
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  return (
    <div className="custom-container">
      <h1 className="custom-title">Sign Up</h1>
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
        <input type="checkbox" className="custom-checkbox" id="terms" />
        <label htmlFor="terms" className="custom-checkbox-label">
          I have read <b>Terms and Conditions</b>
        </label>
      </div>
      <button className="custom-button" onClick={onSubmit}>Register</button>
      <p className="custom-link" onClick={toggleCard}>
        Already have an account? <b>Sign in</b>
      </p>
    </div>
  );
};

Register.propTypes = {
  toggleCard: PropTypes.func.isRequired,
};

export default Register;
