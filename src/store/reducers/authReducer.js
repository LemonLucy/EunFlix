// 로그인/회원가입 상태(email password isLoggedIn error) 관리
const initialState = {
  isAuthenticated: false,
  error: '',
  user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EMAIL':
        return { ...state, email: action.payload };
      case 'SET_PASSWORD':
        return { ...state, password: action.payload };
      case 'SET_ERROR':
        return { ...state, error: action.payload };
        case 'REGISTER_SUCCESS':
            return { ...state, user: action.payload, error: '' };
      case 'LOGIN_SUCCESS':
        return { ...state, isAuthenticated: true,user: action.payload, error: '' };
      case 'SET_LOADING':
        return { ...state, isLoading: action.payload };
      case 'LOGOUT_SUCCESS':
        return { 
          ...state,
          isAuthenticated: false,
          user: null,
          email: '', 
          password: '',
          error: ''
         };
      default:
        return state;
    }
  };
  
  export default authReducer;
  