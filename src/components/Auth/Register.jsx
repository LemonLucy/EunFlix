import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setPassword } from '../../store/actions/authActions';
import useRegister from '../../hooks/useRegister.js'; // Import the custom hook
import '../../pages/Login/Login.css';

const Register = ({ toggleCard }) => {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state) => state.auth);
  const { register } = useRegister(); // Use the custom hook

  const onSubmit = () => {
    register(email, password); // Call the register function from the hook
    if (!error) {
      toggleCard(); // If no error, toggle to login card
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      // Dispatching to set error to null is handled in useRegister
    }
  }, [error]);

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
