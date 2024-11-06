import { useState } from 'react';
import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';
import './Login.css';

const LoginWrapper = () => {
  const [isLoginFocused, setIsLoginFocused] = useState(true);

  const toggleCard = () => {
    setIsLoginFocused((prev) => !prev);
  };

  return (
    <div className="custom-bg-image">
      <div className={`form-wrapper ${isLoginFocused ? 'focus-login' : 'focus-register'}`}>
        <div className="form-container login-form">
          <Login toggleCard={toggleCard} />
        </div>
        <div className="form-container register-form">
          <Register toggleCard={toggleCard} />
        </div>
      </div>
    </div>
  );
};

export default LoginWrapper;