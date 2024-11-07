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
  
  export const loginSuccess = () => {
    localStorage.setItem('isAuthenticated', true);
    return {
      type: 'LOGIN_SUCCESS',
    };
  };
  
  export const logout =()=> (dispatch) => {
    localStorage.setItem('isAuthenticated', false);
    localStorage.removeItem('user-info');
    dispatch({
      type: 'LOGOUT_SUCCESS',
    });
  };