import Home from "./pages/Home/Home"
import {Routes,Route } from "react-router-dom"
import LoginWrapper from "./pages/Login/LoginWrapper"
import PrivateRoute from "./components/Auth/PrivateRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import Popular from "./pages/Popular/Popular";
import Search from "./pages/Search/Search";
import WishList from "./pages/WishList/WishList";
import OAuthRedirectHandler from './components/Auth/OAuthRedirectHandler';
import './index.css';

const App = () => {

  return (
    //<Provider store={store}>
      <Routes>
        <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path='/login' element={<PublicRoute><LoginWrapper/></PublicRoute>} />
        <Route path='/popular' element={<PrivateRoute><Popular /></PrivateRoute>} />
        <Route path='/search' element={<PrivateRoute><Search /></PrivateRoute>} />
        <Route path='/wishlist' element={<PrivateRoute><WishList /></PrivateRoute>} />
        <Route path="/oauth" element={<PublicRoute><OAuthRedirectHandler /></PublicRoute>} />
      </Routes>
    //</Provider>
    
  )
}

export default App