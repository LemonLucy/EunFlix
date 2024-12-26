import { useDispatch } from 'react-redux';
import {setError, loginSuccess} from '../store/actions/authActions';
import useShowToast from './useShowToast';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const dispatch = useDispatch();
  const showToast=useShowToast();
  const navigate = useNavigate();
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  const login = async(email,password,rememberMe) => {
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

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberedPassword', password);
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
        }
        
        navigate('/');
      } else {
        dispatch(setError("Invalid email or password"));
        showToast("Error", "Invalid email or password", "error");
      }
    }catch (error) {
            console.error("Login error:", error);
    } 
};

const loginWithKakao = async (user) => {
  try {
    if (!user) {
      dispatch(setError('Failed to retrieve user info from Kakao.'));
      showToast('Error', 'Kakao Login failed.', 'error');
      return;
    }

    // Redux 상태 업데이트
    dispatch(loginSuccess(user));
    await showToast('Success', 'Kakao Login successful!', 'success');

    // 홈으로 리디렉션
    navigate('/');
  } catch (error) {
    console.error('Kakao Login error:', error);
  }
};


return { login, loginWithKakao };
};

export default useLogin;