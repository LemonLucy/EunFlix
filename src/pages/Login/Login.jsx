import PropTypes from 'prop-types';
import './Login.css';

const Login = ({toggleCard}) => {

  return (
    <div className="login-card" id="login">
      <h1>Sign In</h1>
      <div className={`input`}>
        <input id="email" type="email" placeholder="Email or phone number" />
        <label htmlFor="email"></label>
      </div>
      <div className={`input`}>
        <input id="password" type="password" placeholder="Password" />
        <label htmlFor="password"></label>
      </div>
      <span className="checkbox remember">
        <input type="checkbox" id="remember" />
        <label htmlFor="remember" className="read-text">Remember me</label>
      </span>
      <span className="checkbox forgot">
        <a href="#">Need help?</a>
      </span>
      <button>Sign In</button>
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