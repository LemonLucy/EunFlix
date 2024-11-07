import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { useDispatch, } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/actions/authActions'
import useShowToast from '../../hooks/useShowToast'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const showToast=useShowToast();

    const handleLogout = async() => {
        dispatch(logout());
        localStorage.setItem('isAuthenticated',JSON.stringify(false))
        await showToast("Success","Logout successful!","success");
        navigate('/login');
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