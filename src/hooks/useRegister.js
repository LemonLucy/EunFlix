import { useDispatch } from 'react-redux';
import { setError } from '../store/actions/authActions';
import useLocalStorage from './useLocalStorage';
import useShowToast from './useShowToast';

const useRegister = () => {
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

    // Save user information in local storage
    setStoredUser({ email, password });
    showToast("Success","Account created successfully. Please log in.","success");
  };

  return { register };
};

export default useRegister;
