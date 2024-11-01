import Home from "./pages/Home/Home"
import {Routes,Route } from "react-router-dom"
import LoginWrapper from "./pages/Login/LoginWrapper"
import store from "./store";
import { Provider } from 'react-redux';
import PrivateRoute from "./components/Auth/PrivateRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "./store/actions/authActions";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user-info'));
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

    if (storedUser && isAuthenticated) {
      dispatch(loginSuccess(storedUser)); // 로그인 상태 설정
    }
  }, [dispatch]);
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/login' element={<LoginWrapper/>} />
      </Routes>
    </Provider>
    
  )
}

export default App