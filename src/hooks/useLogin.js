import { useDispatch } from 'react-redux';
import {setError, loginSuccess} from '../store/actions/authActions';
import useLocalStorage from './useLocalStorage';
import useShowToast from './useShowToast';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const dispatch = useDispatch();
  const showToast=useShowToast();
  const navigate = useNavigate();

  const [storedUser] = useLocalStorage('user');

  const login = async(email, password) => {
    try {
        if (!email || !password) {
          dispatch(setError("Email and password are required"));
          showToast("Error", "Email and password are required", "error");
          return;
        }

        if (storedUser && email === storedUser.email && password === storedUser.password) {
            dispatch(loginSuccess());
            localStorage.setItem('isAuthenticated', JSON.stringify(true));
            await showToast("Success","Login successful!","success");
            navigate('/')
        } else {
            dispatch(setError("Invalid email or password"));
            showToast("Error","Email and password are required","error");
        } 
    }catch (error) {
            console.error("Login error:", error);
    } 
};

  return { login };
};

export default useLogin;
