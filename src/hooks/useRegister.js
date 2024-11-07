import { useDispatch } from 'react-redux';
import { setError, loginSuccess, setEmail, setPassword, registerSuccess } from '../store/actions/authActions';
import useLocalStorage from './useLocalStorage';
import useShowToast from './useShowToast';

const useRegister = (toggleCard) => {
  const dispatch = useDispatch();
  const [storedUsers, setStoredUsers] = useLocalStorage('users');
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

    // 기존 사용자 배열에서 중복 이메일 확인
    const existingUsers = Array.isArray(storedUsers) ? storedUsers : [];
    const isUserExists = existingUsers.some((user) => user.email === email);

    if (isUserExists) {
      dispatch(setError("User already exists"));
      showToast("Error", "User already exists", "error");
      return;
    }

    // 새로운 사용자 추가 및 저장
    const newUser = { email, password };
    const updatedUsers = [...existingUsers, newUser];
    setStoredUsers(updatedUsers); // 로컬 스토리지에 배열 형태로 저장
    dispatch(registerSuccess(newUser));
    showToast("Success", "Account created successfully.", "success");
    toggleCard();
  };

  return { register };
};

export default useRegister;
