// LoginWrapper.js
import { useState } from 'react';
import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';
import '../../pages/Login/Login.css';

const LoginWrapper = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [animationClass, setAnimationClass] = useState('slide-in');

  const toggleCard = () => {
    setAnimationClass('slide-out'); // 기존 화면 슬라이드 아웃
    setTimeout(() => {
      setIsLoginVisible(!isLoginVisible); // 화면 전환
      setAnimationClass('slide-in'); // 새로운 화면 슬라이드 인
    }, 400); // 애니메이션 시간과 맞춤
  };

  return (
    <div className="custom-bg-image">
      <div className={`custom-container ${animationClass}`}>
        {isLoginVisible ? <Login toggleCard={toggleCard} /> : <Register toggleCard={toggleCard} />}
      </div>
    </div>
  );
};

export default LoginWrapper;
