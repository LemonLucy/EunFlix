// 로그인/회원가입 상태(email password isLoggedIn error) 관리
const initialState = {
  email: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).email
    : '',
  password: '', // 비밀번호는 보안상의 이유로 로컬 스토리지에 저장하지 않는 것이 좋음
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
  error: '',
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
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
  