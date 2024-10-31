import  { useState } from 'react';
import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';
import './Login.css';

const LoginWrapper = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);

  const toggleCard = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  return (
    <div className="bg-image">
      <div className="container">
        <div id="phone">
          <div id="content-wrapper">
            {isLoginVisible ? <Login toggleCard={toggleCard} /> : <Register toggleCard={toggleCard} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWrapper;
