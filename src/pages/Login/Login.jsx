import { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);

  const toggleCard = () => {
    setIsLoginVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className="bg-image"></div>
      <div className="container">
        <div id="phone">
          <div id="content-wrapper">
            {/* 로그인 카드 */}
            <div className={`card ${isLoginVisible ? 'active' : ''}`} id="login">
              <h1>Sign In</h1>
              <div className={`input`}>
                <input id="email" type="email" placeholder="Email or phone number" />
                <label htmlFor="email"></label>
              </div>
              <div className={`input`}>
                <input id="password" type="password" placeholder="Password" />
                <label htmlFor="password"></label>
              </div>
              <span className="checkbox remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="read-text">Remember me</label>
              </span>
              <span className="checkbox forgot">
                <a href="#">Need help?</a>
              </span>
              <button>Sign In</button>
              <a href="#" className="account-check" onClick={toggleCard}>
                New to Netflix? <b>Sign up now</b>
              </a>
            </div>

            {/* 회원가입 카드 */}
            <div className={`card ${!isLoginVisible ? 'active' : ''}`} id="register">
              <h1>Sign Up</h1>
              <div className={`input`}>
                <input id="register-email" type="email" placeholder="Email" />
                <label htmlFor="register-email"></label>
              </div>
              <div className={`input`}>
                <input id="register-password" type="password" placeholder="Password" />
                <label htmlFor="register-password"></label>
              </div>
              <div className={`input`}>
                <input id="confirm-password" type="password" placeholder="Confirm Password" />
                <label htmlFor="confirm-password"></label>
              </div>
              <span className="checkbox remember">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms" className="read-text">
                  I have read Terms and Conditions
                </label>
              </span>
              <button>Register</button>
              <a href="#" className="account-check" onClick={toggleCard}>
                Already have an account? <b>Sign in</b>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;