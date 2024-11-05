// hooks/useWishlist.js
import { useState, useEffect } from 'react';

const useWishlist = () => {
  // Initialize the wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return Array.isArray(savedWishlist) ? savedWishlist : [];
  });

  // Toggle the movie in the wishlist
  const toggleWishlist = (movie) => {
    setWishlist((prev) => {
      let updatedWishlist;
      if (prev.some((item) => item.id === movie.id)) {
        // Remove movie if already in wishlist
        updatedWishlist = prev.filter((item) => item.id !== movie.id);
      } else {
        // Add movie if not in wishlist
        updatedWishlist = [
          ...prev,
          {
            id: movie.id,
            title: movie.title,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            vote_average: movie.vote_average,
            release_date: movie.release_date,
            genre_ids: movie.genre_ids,
          },
        ];
      }

      // Update localStorage
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  // Synchronize state with localStorage on component mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  return [wishlist, toggleWishlist];
};

export default useWishlist;
