import { useEffect } from 'react';
import PropTypes from 'prop-types';

const KakaoLogin = () => {
  useEffect(() => {
    const loadKakaoSDK = () => {
      if (!window.Kakao) {
        const script = document.createElement('script');
        script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
        script.integrity =
          'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka';
        script.crossOrigin = 'anonymous';
        script.async = true;

        script.onload = () => {
          console.log('Kakao SDK loaded');

          // Kakao SDK 초기화
          if (window.Kakao && !window.Kakao.isInitialized()) {
            const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;
            console.log("kakaokey : ",kakaoKey)
            if (kakaoKey) {
              window.Kakao.init(kakaoKey);
              window.Kakao.isInitialized()
              console.log('Kakao SDK initialized with key:', kakaoKey);

              // 초기화 상태 확인
              console.log('Is Kakao SDK Initialized?', window.Kakao.isInitialized());
            } else {
              console.error('Kakao JavaScript Key is not defined!');
            }
          }
        };

        script.onerror = () => console.error('Failed to load Kakao SDK');
        document.body.appendChild(script);
      } else {
        console.log('Kakao SDK already loaded');

        // Kakao SDK 초기화
        if (!window.Kakao.isInitialized()) {
          const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;
          if (kakaoKey) {
            window.Kakao.init(kakaoKey);
            window.Kakao.isInitialized();
            console.log('Kakao SDK initialized with key:', kakaoKey);

            // 초기화 상태 확인
            console.log('Is Kakao SDK Initialized?', window.Kakao.isInitialized());
          } else {
            console.error('Kakao JavaScript Key is not defined!');
          }
        }
      }
    };

    loadKakaoSDK();
  }, []);

  const handleLogin = () => {
    if (!window.Kakao || !window.Kakao.Auth) {
      console.error('Kakao SDK is not initialized!');
      return;
    }

    window.Kakao.Auth.authorize({
        redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      });      
  };

  return (
    <div>
      <button
        onClick={handleLogin}
        style={{
          backgroundColor: '#FEE500',
          color: '#000',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Login with Kakao
      </button>
    </div>
  );
};

KakaoLogin.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

export default KakaoLogin;
