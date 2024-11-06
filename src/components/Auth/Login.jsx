import PropTypes from 'prop-types';
import { setEmail, setPassword} from '../../store/actions/authActions';

import { useDispatch, useSelector } from 'react-redux';
import useLogin from '../../hooks/useLogin.js'; // Import the custom hook
import { Input, Button, Checkbox } from '@chakra-ui/react'; // Chakra UI 컴포넌트 사용
import '../../pages/Login/Login.css';

const Login = ({ toggleCard }) => {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state) => state.auth);
  const { login } = useLogin(); // Use the custom hook

  const onSubmit = () => {
    login(email, password); // Call the login function from the hook
  };

  return (
    <div className="custom-container">
      <h1 className="custom-title">Sign In</h1>
      <Input
        className="custom-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
      />
      <Input
        className="custom-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
      />
      {error && <p className="custom-error-message">{error}</p>}
      <Checkbox className="custom-checkbox" id="remember">Remember me</Checkbox>
      <Button className="custom-button" onClick={onSubmit}>Sign In</Button>
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
