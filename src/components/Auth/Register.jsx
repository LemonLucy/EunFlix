import '../../pages/Login/Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setError } from '../../store/actions/authActions';
import PropTypes from 'prop-types';
import useShowToast from '../../hooks/useShowToast';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useEffect } from 'react';

const Register = ({ toggleCard }) => {
    const dispatch = useDispatch();
    const { email, password, error } = useSelector((state) => state.auth);
    const showToast=useShowToast();
    const [, setUserInLocalStorage] = useLocalStorage('user');

    useEffect(() => {
        if (error) {
            showToast('Error', error, 'error');
            dispatch(setError(null));
        }
    }, [error, dispatch, showToast]);

      
    const onSubmit = () => {

        if (!email) {
          dispatch(setError("Email is required"));
          return;
        }
        if (password.length < 6) {
          dispatch(setError("Password must be at least 6 characters"));
          return;
        }
        //localstorage에 사용자 정보 저장
        setUserInLocalStorage({ email, password });
        // 등록 성공 시: 로그인 화면으로 이동
        showToast('Success', 'Account created successfully. Please log in.', 'success');
        toggleCard(); // 로그인 화면으로 전환

        //에러초기화
        dispatch(setError(null));
      };

    return (
        <div className="login-card" id="register">
        <h1>Sign Up</h1>
        <div className="input">
            <input id="register-email" type="email" placeholder="Email" 
            onChange={(e) => dispatch(setEmail(e.target.value))}/>
            <label htmlFor="register-email"></label>
        </div>
        <div className="input">
            <input id="register-password" type="password" placeholder="Password" 
            onChange={(e) => dispatch(setPassword(e.target.value))}    />        
            <label htmlFor="register-password"></label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <span className="checkbox remember">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="read-text">
            I have read <b>Terms and Conditions</b>
            </label>
        </span>
        <button onClick={onSubmit}>Register</button>
        <a href="#" className="account-check" onClick={toggleCard}>
            Already have an account? <b>Sign in</b>
        </a>
        </div>
    );
};
Register.propTypes = {
    toggleCard: PropTypes.func.isRequired,  // Prop validation added here
  };
  

export default Register;