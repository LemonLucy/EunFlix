import { useDispatch } from 'react-redux';
import {setError, loginSuccess } from '../../store/actions/authActions';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import useShowToast from './useShowToast';

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast=useShowToast();

  const [storedUser] = useLocalStorage('user');
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated');

  const login = (email, password) => {
    if (!email || !password) {
      dispatch(setError("Email and password are required"));
      showToast("Error","Email and password are required","error");
      return;
    }

    if (storedUser && email === storedUser.email && password === storedUser.password) {
      dispatch(loginSuccess());
      if (!isAuthenticated) setIsAuthenticated(true);
      navigate('/');
      showToast("Success","Login successful!","success");
    } else {
      dispatch(setError("Invalid email or password"));
      showToast("Error","Email and password are required","error");
    }
  };

  return { login };
};

export default useLogin;
