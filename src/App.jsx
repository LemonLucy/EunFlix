import Home from "./pages/Home/Home"
import {Routes,Route } from "react-router-dom"
import LoginWrapper from "./pages/Login/LoginWrapper"
import store from "./store";
import { Provider } from 'react-redux';
import PrivateRoute from "./components/Auth/PrivateRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess,setEmail } from "./store/actions/authActions";
import Popular from "./pages/Popular/Popular";
import Search from "./pages/Search/Search";
import WishList from "./pages/WishList/WishList";
import { setWishlist } from "./store/slices/wishlistSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const isAuthenticated = JSON.parse(localStorage.getItem('isLoggedIn'));
      const storedUser = JSON.parse(localStorage.getItem('user-info'));
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
      if (isAuthenticated && storedUser) {
        dispatch(loginSuccess());
        dispatch(setEmail(storedUser.email)); 
        dispatch(setWishlist(savedWishlist));
      }
    } catch (error) {
      console.error("Failed to parse localStorage data:", error);
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/login' element={<PublicRoute><LoginWrapper/></PublicRoute>} />
        <Route path='/popular' element={<PrivateRoute><Popular /></PrivateRoute>} />
        <Route path='/search' element={<PrivateRoute><Search /></PrivateRoute>} />
        <Route path='/wishlist' element={<PrivateRoute><WishList /></PrivateRoute>} />
      </Routes>
    </Provider>
    
  )
}

export default App