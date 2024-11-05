import '../../components/TitleCards/TitleCards.css';
import { AiFillHeart } from 'react-icons/ai';
import useWishlist from '../../hooks/useWishlist';
import { useState } from 'react';
import MovieModal from '../../components//TitleCards/MovieModal'; // Import MovieModal
import { useDisclosure } from '@chakra-ui/react';

const WishList = () => {
  const [wishlist, toggleWishlist] = useWishlist();
  const [selectedMovie, setSelectedMovie] = useState(null); // State for the selected movie
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal controls

  // Function to open the modal with the selected movie
  const openModal = (movie) => {
    setSelectedMovie(movie);
    onOpen();
  };

  return (
    <div className="titlecards">
      <h2>My Wishlist</h2>
      <div className="titlecard-container">
        {wishlist.length > 0 ? (
          wishlist.map((movie) => (
            <div className="titlecard" key={movie.id}>
              <div className="image-container" onClick={() => openModal(movie)}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie" />
                <div className="overlay">
                  <div className="icon-button" onClick={(e) => { 
                    e.stopPropagation(); // Prevents modal opening when heart is clicked
                    toggleWishlist(movie);
                  }}>
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

      {/* MovieModal for displaying movie details */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} isOpen={isOpen} onClose={onClose} isLiked={wishlist.some((item) => item.id === selectedMovie.id)}
        toggleWishlist={toggleWishlist}/>
      )}
    </div>
  );
};

export default WishList;
