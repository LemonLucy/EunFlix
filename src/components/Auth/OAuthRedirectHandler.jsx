import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../store/actions/authActions';

const OAuthRedirectHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchAccessToken(code);
    } else {
      console.error('Authorization code not found');
      navigate('/'); // 홈으로 리디렉션
    }
  }, []);

  const fetchAccessToken = async (code) => {
    try {
      const response = await fetch(`https://kauth.kakao.com/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_KAKAO_JS_KEY,
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          code,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch access token');
      }

      const data = await response.json();
      console.log('Access Token:', data.access_token);

      // 사용자 정보 가져오기
      await fetchUserInfo(data.access_token);

      // 홈으로 리디렉션
      navigate('/');
    } catch (error) {
      console.error('Failed to fetch access token:', error);
      navigate('/'); // 오류 시 홈으로 리디렉션
    }
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userInfo = await response.json();
      console.log('User Info:', userInfo);

      // Redux 상태 업데이트
      const user = {
        id: userInfo.id,
        email: userInfo.kakao_account?.email || '',
        name: userInfo.properties?.nickname || 'Unknown',
      };
      dispatch(loginSuccess(user));

      // 사용자 정보를 localStorage에 저장
      localStorage.setItem('kakaoUser', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  return <div>Processing Kakao Login...</div>;
};

export default OAuthRedirectHandler;
