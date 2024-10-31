import './Login.css';
import PropTypes from 'prop-types';


const Register = ({ toggleCard }) => {
  return (
    <div className="login-card" id="register">
      <h1>Sign Up</h1>
      <div className="input">
        <input id="register-email" type="email" placeholder="Email" />
        <label htmlFor="register-email">Email</label>
      </div>
      <div className="input">
        <input id="register-password" type="password" placeholder="Password" />
        <label htmlFor="register-password">Password</label>
      </div>
      <div className="input">
        <input id="confirm-password" type="password" placeholder="Confirm Password" />
        <label htmlFor="confirm-password">Confirm Password</label>
      </div>
      <span className="checkbox remember">
        <input type="checkbox" id="terms" />
        <label htmlFor="terms" className="read-text">
          I have read <b>Terms and Conditions</b>
        </label>
      </span>
      <button>Register</button>
      <a href="#" className="account-check" onClick={toggleCard}>
        Already have an account? <b>Sign in</b>
      </a>
    </div>
  );
};
Register.propTypes = {
    toggleCard: PropTypes.func.isRequired,  // Prop validation added here
  };
  

export default Register;
