import Home from "./pages/Home/Home"
import {Routes,Route } from "react-router-dom"
import LoginWrapper from "./pages/Login/LoginWrapper"
import store from "./store";
import { Provider } from 'react-redux';
import PrivateRoute from "./components/Auth/PrivateRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess,setEmail } from "./store/actions/authActions";
import Popular from "./pages/Popular/Popular";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const isAuthenticated = JSON.parse(localStorage.getItem('isLoggedIn'));
      const storedUser = JSON.parse(localStorage.getItem('user-info'));
  
      if (isAuthenticated && storedUser) {
        dispatch(loginSuccess());
        dispatch(setEmail(storedUser.email)); 
      }
    } catch (error) {
      console.error("Failed to parse localStorage data:", error);
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/login' element={<LoginWrapper/>} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/search' element={<Popular />} />
        <Route path='/wishlist' element={<Popular />} />
      </Routes>
    </Provider>
    
  )
}

export default App