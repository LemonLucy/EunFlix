import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import info_icon from '../../assets/info_icon.png';
import play_icon from '../../assets/play_icon.png';
import spinner from '../../assets/spinner.gif';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import  { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Simulate loading time or wait for content to be ready
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Adjust the timeout as needed

      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
    {isAuthenticated ?(
      isLoading ? (
        // Display loading GIF while content is loading
        <div className="loading-container">
            <img src={spinner} alt="Loading..." />
          </div>
      ):(
      <div className="home">
        <Navbar />
        <div className="hero">
          <img src={hero_banner} alt="Hero Banner" className="banner-img" />
          <div className="hero-caption">
            <img src={hero_title} alt="Hero Title" className="caption-img" />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
              voluptatibus quidem distinctio delectus illum? Quibusdam id unde
              accusantium provident recusandae pariatur ab, soluta sequi non. Eum,
              exercitationem! Cupiditate, tempora amet.
            </p>
            <div className="hero-btns">
              <button className="home-btn play">
                <img src={play_icon} alt="Play Icon" />
                Play
              </button>
              <button className="home-btn dark-btn">
                <img src={info_icon} alt="Info Icon" />
                More Info
              </button>
            </div>
            <br></br>
            <TitleCards />
          </div>
        </div>
        <br></br>
        <br></br>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="more-cards">
        <TitleCards 
            title="Blockbuster Movies" 
            filters={{ sortBy: 'vote_average.desc', genre: '28', rating: '8' }} 
          />
          <TitleCards 
            title="Only on EunFlex" 
            filters={{ sortBy: 'popularity.desc', genre: '35' }} 
          />
          <TitleCards 
            title="Top Picks for You" 
            filters={{ sortBy: 'popularity.desc', rating: '7' }} 
          />
        </div>
        <Footer />
      </div>)
      ):(<div className="loading-container">
        <img src={spinner} alt="Loading..." />
      </div>
      )
  }
  </>
  );
};

TitleCards.propTypes = {
  title: PropTypes.string,
  filters: PropTypes.object,
};

TitleCards.defaultProps = {
  title: "Popular on EunFlex",
  filters: { sortBy: 'popularity.desc', genre: '', rating: '' },
};

export default Home; 