import '../../components/TitleCards/TitleCards.css';
import { AiFillHeart } from 'react-icons/ai';
import useWishlist from '../../hooks/useWishlist';

const WishList = () => {
  const [wishlist, toggleWishlist] = useWishlist();

  return (
    <div className="titlecards">
      <h2>My Wishlist</h2>
      <div className="titlecard-container">
        {wishlist.length > 0 ? (
          wishlist.map((movie) => (
            <div className="titlecard" key={movie.id}>
              <div className="image-container">
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie" />
                <div className="overlay">
                  <div className="icon-button"  onClick={() => toggleWishlist(movie)}>
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