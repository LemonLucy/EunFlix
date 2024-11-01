import Home from "./pages/Home/Home"
import {Routes,Route } from "react-router-dom"
import LoginWrapper from "./pages/Login/LoginWrapper"
import store from "./store";
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<LoginWrapper/>} />
          </Routes>
    </Provider>
    
  )
}

export default App