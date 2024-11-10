// hooks/useWishlist.js
import { useState, useEffect,useRef } from 'react';

const useWishlist = (email) => {
  const [wishlist, setWishlist] = useState([]);
  const emailRef = useRef(email);

  useEffect(() => {
    emailRef.current = email;
    console.log("emailref",emailRef)
  }, [email]);

  useEffect(() => {
    if (email) {
      // Retrieve wishlist from localStorage
      const savedData = localStorage.getItem(`wishlist_${email}`);
      let savedWishlist=[];
      
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          if (Array.isArray(parsedData)) {
            savedWishlist = parsedData;
          }
        } catch (error) {
          console.error("Error parsing wishlist data:", error);
        }
      }

      setWishlist(savedWishlist);
    }
  }, [email]);

  // Toggle the movie in the wishlist
  const toggleWishlist = (movie) => {
    const currentEmail = emailRef.current; // Use the latest email from the ref
    if (!currentEmail) {
      console.log("Cannot toggle wishlist as email is undefined"); // Prevent action if email is undefined
      return;
    }
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      let updatedWishlist;

      if (exists) {
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

      if (updatedWishlist.length !== prev.length || exists) {
        localStorage.setItem(`wishlist_${currentEmail}`, JSON.stringify(updatedWishlist));
        return updatedWishlist;
      }

      return prev;
    });
  };

  return [wishlist, toggleWishlist];
};

export default useWishlist;
