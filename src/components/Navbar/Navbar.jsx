import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/actions/authActions'


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Redux 상태와 localStorage에서 사용자 정보 제거
        dispatch(logout());
        localStorage.removeItem('user-info');
        localStorage.removeItem('isAuthenticated');
        navigate('/login'); // 로그인 페이지로 리디렉션
      };

  return (
    <>
        <div className='navbar'>
            <div className='navbar-left'>
                <img src={logo} alt="" onClick={() => navigate('/')} className="logo"  />
                <ul>
                <li onClick={() => navigate('/')}>Home</li>
                    <li onClick={() => navigate('/popular')}>Popular</li>
                    <li onClick={() => navigate('/wishlist')}>WishList</li>
                    <li onClick={() => navigate('/search')}>Search</li>
                </ul>
            </div>
            <div className='navbar-right'>
                <img src={search_icon} alt="" className='icons'/>
                <p>Children</p>
                <img src={bell_icon} alt="" className='icons'/>
                <div className='navbar-profile'>
                    <img src={profile_img} alt="" className='profile' />
                    <img src={caret_icon} alt="" />
                    <div className='dropdown' onClick={handleLogout}>
                        <p>Sign Out</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar