import { useDispatch } from 'react-redux';
import {setError, loginSuccess} from '../store/actions/authActions';
import useShowToast from './useShowToast';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const dispatch = useDispatch();
  const showToast=useShowToast();
  const navigate = useNavigate();
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  const login = async(email,password) => {
    console.log("Email in login function:", email); // email 값 확인
    console.log("Password in login function:", password); // password 값 확인
    console.log("Stored User in login function:", storedUsers); // storedUser 값 확인
    console.log("storedUser email : ",storedUsers.email);
    console.log("storedUser password : ",storedUsers.password);

    try {
      if (!email || !password) {
        dispatch(setError("Email and password are required"));
        showToast("Error", "Email and password are required", "error");
        return;
      }

      const user = storedUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        dispatch(loginSuccess(user));
        await showToast("Success", "Login successful!", "success");
        navigate('/');
      } else {
        dispatch(setError("Invalid email or password"));
        showToast("Error", "Invalid email or password", "error");
      }
    }catch (error) {
            console.error("Login error:", error);
    } 
};

  return { login };
};

export default useLogin;
