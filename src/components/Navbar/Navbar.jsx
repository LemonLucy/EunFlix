import './Navbar.css'
import logo from '../../assets/logo.png'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { useDispatch, } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/actions/authActions'
import useShowToast from '../../hooks/useShowToast'
import { AiFillHeart } from 'react-icons/ai'
import { HiFire } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                <img src={logo} alt="" onClick={() => navigate('/')} className="home-logo" />
                <ul>
                    <li onClick={() => navigate('/popular')}>Popular</li>
                    <li onClick={() => navigate('/wishlist')}>WishList</li>
                    <li onClick={() => navigate('/search')}>Search</li>
                </ul>
            </div>
            <div className='navbar-right'>
                <AiFillHeart color='pink' onClick={() => navigate('/wishlist')} size={25} className='icons'/>
                <HiFire color='pink' onClick={() => navigate('/popular')} size={50} className='icons' />
                <IoSearch color='pink' onClick={() => navigate('/search')} size={50} className='icons'/>
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