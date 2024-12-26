import './Navbar.css';
import logo from '../../assets/logo.png';
import caret_icon from '../../assets/caret_icon.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';
import useShowToast from '../../hooks/useShowToast';
import { AiFillHeart } from 'react-icons/ai';
import { HiFire } from 'react-icons/hi';
import { IoSearch } from 'react-icons/io5';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useShowToast();
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('');

  // LocalStorage에서 사용자 정보 가져오기
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setProfileImage(user.profileImage || ''); // 프로필 이미지 설정
      setName(user.name || 'Unknown User'); // 이름 설정
      console.log(name)
    }
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.setItem('isAuthenticated', JSON.stringify(false));
    await showToast('Success', 'Logout successful!', 'success');
    navigate('/login');
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <img
            src={logo}
            alt=""
            onClick={() => navigate('/')}
            className="home-logo"
          />
          <ul>
            <li onClick={() => navigate('/popular')}>Popular</li>
            <li onClick={() => navigate('/wishlist')}>WishList</li>
            <li onClick={() => navigate('/search')}>Search</li>
          </ul>
          
        </div>
        <div className="navbar-right">
          <AiFillHeart
            color="white"
            onClick={() => navigate('/wishlist')}
            size={25}
            className="icons"
          />
          <HiFire
            color="white"
            onClick={() => navigate('/popular')}
            size={50}
            className="icons"
          />
          <IoSearch
            color="white"
            onClick={() => navigate('/search')}
            size={50}
            className="icons"
          />
          

          <div className="navbar-profile">
            {/* 사용자 프로필 이미지 */}
            <img src={profileImage} alt="Profile" className="profile" />
            <img src={caret_icon} alt="Caret Icon" />

            <div className="dropdown" onClick={handleLogout}>
                {/* 사용자 이름 표시 */}
          <p className="navbar-name">{name}</p>
              <p>Sign Out</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
