// 로그인/회원가입 상태(email password isLoggedIn error) 관리
const initialState = {
    email: '',
    password: '',
    isLoggedIn: false,
    error: '',
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
        return { ...state, isLoggedIn: true, error: '' };
      case 'LOGOUT':
        return { ...state, isLoggedIn: false, email: '', password: '' };
      default:
        return state;
    }
  };
  
  export default authReducer;
  