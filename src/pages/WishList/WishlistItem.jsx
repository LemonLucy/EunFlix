import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import PropTypes from 'prop-types';
const WishlistItem = ({ movie, toggleWishlist, openModal }) => {
  return (
    <div className="titlecard" key={movie.id}>
      <div className="image-container" onClick={() => openModal(movie)}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie" />
        <div className="overlay">
          <div className="icon-button" onClick={(e) => { 
            e.stopPropagation();
            toggleWishlist(movie);
          }}>
            <AiFillHeart size={25} color="red" />
          </div>
        </div>
        <p>{movie.title}</p>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders if the movie item hasn’t changed
export default React.memo(WishlistItem, (prevProps, nextProps) => prevProps.movie.id === nextProps.movie.id);

WishlistItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    backdrop_path: PropTypes.string,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  toggleWishlist: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};