import '../../components/TitleCards/TitleCards.css';
import { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';

const WishList = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);

  useEffect(() => {
    // Retrieve wishlist from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistMovies(savedWishlist);
  }, []);

  return (
    <div className="titlecards">
      <h2>My Wishlist</h2>
      <div className="titlecard-container">
        {wishlistMovies.length > 0 ? (
          wishlistMovies.map((movie) => (
            <div className="titlecard" key={movie.id}>
              <div className="image-container">
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie" />
                <div className="overlay">
                  <div className="icon-button">
                    <AiFillHeart size={25} color="red" /> {/* Always red since it's in the wishlist */}
                  </div>
                </div>
                <p>{movie.title}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No movies in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default WishList;