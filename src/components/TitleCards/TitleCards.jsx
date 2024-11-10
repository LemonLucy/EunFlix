import './TitleCards.css'
import React, { useRef,useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types';
import { AiFillHeart } from 'react-icons/ai';
import useWishlist from '../../hooks/useWishlist';
import MovieModal from './MovieModal.jsx';
import { useDisclosure, Skeleton } from '@chakra-ui/react';
import useShowToast from '../../hooks/useShowToast.js';
import { useSelector } from 'react-redux';

const TitleCards = ({title, filters= {}}) => {

  const email = useSelector((state) => state.auth.email);
  const cardsRef =useRef();
  const [apiData, setApiData]=useState([])
  const [,wishlistIds, toggleWishlist] = useWishlist(email);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const showToast=useShowToast();

  const openModal = (movie) => {
    setSelectedMovie(movie);
    onOpen(true);
  }
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk0YzBkNGQ4ZTRlYjRiNjU3MjhlYTlkODNmZjNkOCIsIm5iZiI6MTczMDE4NTY1Ni40NDAxODEsInN1YiI6IjY3MjA2OGU0MjdiZDU3ZDkxZjYzNGRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bvDVOGO4YkH4kUgs109IqfGVL1qkTlHo1jxNNAAmmmA'
    }
  };

  const setLocalStorageWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getLocalStorageWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const fetchMovies = useCallback(() => {
    const cachedData = getLocalStorageWithExpiry('moies');
    if (cachedData) {
      setApiData(cachedData);
      setLoading(false);
      return;
    }

    const { genre, rating, sortBy, search } = filters|| {};
    let url = `https://api.themoviedb.org/3/discover/movie?language=ko-KR&sort_by=${sortBy}&page=1`;

    if (genre) url += `&with_genres=${genre}`;
    if (rating) url += `&vote_average.gte=${rating}`;

    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?language=ko-KR&query=${encodeURIComponent(search)}&page=1`;
    }

    setLoading(true);
    setError(null);

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((response) => {
        const movies = response.results
        .filter((movie) => movie.backdrop_path)
        .map((movie) => ({
          id: movie.id,
          title: movie.title,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          genre_ids: movie.genre_ids,
        }));
        setApiData(movies);
        setLocalStorageWithExpiry('movies', movies, 30 * 60 * 1000);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error(err);
          setError(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });;

});

  useEffect(() => {
    fetchMovies(filters); // filters가 변경될 때마다 API 호출
  }, [JSON.stringify(filters)]);

  const scrollLeft = () => {
    cardsRef.current.scrollLeft -= 5 * 200; // 5개의 카드 너비만큼 이동
  };

  const scrollRight = () => {
    cardsRef.current.scrollLeft += 5 * 200; // 5개의 카드 너비만큼 이동
  };

  return (
    <div className="titlecards">
      <h2>{title || "Popular on EunFlex"}</h2>
      <div className="titlecard-container">
        <button onClick={scrollLeft} className="scroll-button">{"<"}</button>
        <div className="titlecard-list" ref={cardsRef}>
        {loading || apiData.length === 0? (
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} borderRadius="md" />
            ))
          ) : error ? (
            showToast("Error", {error}, "error")
          ) : (
            apiData.map((card) => (
              <div className="titlecard" key={card.id}>
                <div className="image-container" onClick={() => openModal(card)}>
                  <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="cards" />
                  <div className="overlay">
                    <div className="icon-button" onClick={() => toggleWishlist(card)}>
                      <AiFillHeart size={25} cursor="pointer" color={wishlistIds.includes(card.id) ? 'red' : 'white'} />
                    </div>
                  </div>
                  <p>{card.title}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <button onClick={scrollRight} className="scroll-button">{">"}</button>
      </div>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={isOpen}
          onClose={onClose}
          isLiked={wishlistIds.includes(selectedMovie.id)}
          toggleWishlist={toggleWishlist}
        />
      )}
    </div>
);
};

TitleCards.propTypes = {
  title: PropTypes.string,
  filters: PropTypes.object.isRequired,
};

export default React.memo(TitleCards);