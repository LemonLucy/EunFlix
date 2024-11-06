// 로그인/회원가입 상태(email password isLoggedIn error) 관리
const initialState = {
    email: '',
    password: '',
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    error: '',
    isLoading: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EMAIL':
        return { ...state, email: action.payload };
      case 'SET_PASSWORD':
        return { ...state, password: action.payload };
      case 'SET_ERROR':
        return { ...state, error: action.payload };
      case 'LOGIN_SUCCESS':
        localStorage.setItem('isAuthenticated', true);
        return { ...state, isAuthenticated: true, error: '' };
      case 'SET_LOADING':
        return { ...state, isLoading: action.payload };
      case 'LOGOUT':
        localStorage.setItem('isAuthenticated',false);
        return { ...state, isAuthenticated: false };
      default:
        return state;
    }
  };
  
  export default authReducer;
  