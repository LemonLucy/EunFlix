// auth 상태와 관련된 액션 정의 사용
export const setEmail = (email) => ({
    type: 'SET_EMAIL',
    payload: email,
  });
  
  export const setPassword = (password) => ({
    type: 'SET_PASSWORD',
    payload: password,
  });
  
  export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error,
  });
  
  export const registerSuccess = (user) => {
    // 기존 로컬 스토리지에서 사용자 배열 불러오기
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // 새로운 사용자 추가
    const updatedUsers = [...existingUsers, user];
    
    // 업데이트된 배열을 로컬 스토리지에 저장
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log("Updated user list in localStorage:", updatedUsers); // 확인용 콘솔 출력
    
    return {
      type: 'REGISTER_SUCCESS',
      payload: user,
    };
  };

  export const loginSuccess = (user) => {
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('user', JSON.stringify(user));
    return {
      type: 'LOGIN_SUCCESS',
      payload: user,
    };
  };
  
  export const logout = () => (dispatch) => {
    localStorage.removeItem('user'); // users 배열 삭제
    localStorage.setItem('isAuthenticated', false); // 인증 상태 초기화
    dispatch({
      type: 'LOGOUT_SUCCESS',
    });
  };