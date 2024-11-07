import { useDispatch } from 'react-redux';
import { setError, loginSuccess, setEmail, setPassword, registerSuccess } from '../store/actions/authActions';
import useLocalStorage from './useLocalStorage';
import useShowToast from './useShowToast';

const useRegister = (toggleCard) => {
  const dispatch = useDispatch();
  const [storedUser, setStoredUser] = useLocalStorage('user');
  const showToast=useShowToast();

  const register = (email, password) => {
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
      showToast("Error","Password must be at least 6 characters","error");
      return;
    }

    // Check if the user already exists
    if (storedUser && storedUser.email === email) {
      dispatch(setError("User already exists"));
      showToast("Error","User already exists","error");
      return;
    }

    const user = { email, password };
    setStoredUser(user);
    console.log(storedUser);
    dispatch(registerSuccess(user));
    showToast("Success","Account created successfully. ","success");
    toggleCard();
  };

  return { register };
};

export default useRegister;
