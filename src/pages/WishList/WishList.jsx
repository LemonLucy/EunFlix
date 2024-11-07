import '../../components/TitleCards/TitleCards.css';
import { AiFillHeart } from 'react-icons/ai';
import useWishlist from '../../hooks/useWishlist';
import { useState } from 'react';
import MovieModal from '../../components//TitleCards/MovieModal'; // Import MovieModal
import { useDisclosure } from '@chakra-ui/react';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';

const WishList = () => {
  const navigate = useNavigate();
  const [wishlist, toggleWishlist] = useWishlist();
  const [selectedMovie, setSelectedMovie] = useState(null); // State for the selected movie
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal controls

  const pageSize = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(wishlist.length / pageSize);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return wishlist.slice(startIndex, startIndex + pageSize);
  };

  // Function to open the modal with the selected movie
  const openModal = (movie) => {
    setSelectedMovie(movie);
    onOpen();
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="titlecards">
      <img src={logo} alt="" onClick={() => navigate('/')} className="logo"  />
      <h2>My Wishlist</h2>
      <div className="titlecard-grid">
        {getCurrentPageItems().length > 0 ? (
          getCurrentPageItems().map((movie) => (
            <div className="titlecard" key={movie.id}>
              <div className="image-container" onClick={() => openModal(movie)}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie" />
                <div className="overlay">
                  <div className="icon-button" onClick={(e) => { 
                    e.stopPropagation(); // Prevents modal opening when heart is clicked
                    toggleWishlist(movie);
                  }}>
                    <AiFillHeart size={25} color="red" />
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

      {/* Page Navigation */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
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
