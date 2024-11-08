import { useDispatch } from 'react-redux';
import { setError, registerSuccess } from '../store/actions/authActions';
import useLocalStorage from './useLocalStorage';
import useShowToast from './useShowToast';

const useRegister = (toggleCard) => {
  const dispatch = useDispatch();
  const [storedUsers] = useLocalStorage('users');
  const showToast=useShowToast();

  const register = (email, password, confirmPassword, termsAccepted) => {
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

    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      showToast("Error", "Passwords do not match", "error");
      return;
    }
    if (!termsAccepted) {
      dispatch(setError("You must accept the Terms and Policy"));
      showToast("Error", "You must accept the Terms and Policy", "error");
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
    dispatch(registerSuccess(newUser));
    showToast("Success", "Account created successfully.", "success");
    toggleCard();
  };

  return { register };
};

export default useRegister;
