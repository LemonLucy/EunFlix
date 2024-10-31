import PropTypes from 'prop-types';
import '../../pages/Login/Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setError, loginSuccess } from '../../store/actions/authActions';


const Login = ({toggleCard}) => {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state) => state.auth);

  const onSubmit = () => {
    if (email && password) {
      dispatch(loginSuccess());
      console.log("User logged in:", { email });
    } else {
      dispatch(setError("Email and password are required"));
    }
  };

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