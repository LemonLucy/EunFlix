import './TitleCards.css'
import { useRef,useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

const TitleCards = ({title, filters= {}}) => {

  const cardsRef =useRef();
  const [apiData, setApiData]=useState([])

  const [likedMovies, setLikedMovies] = useState(() => {
    const savedLikes = JSON.parse(localStorage.getItem('wishlist')) || [];
    return Array.isArray(savedLikes) ? savedLikes : [];
  });

  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk0YzBkNGQ4ZTRlYjRiNjU3MjhlYTlkODNmZjNkOCIsIm5iZiI6MTczMDE4NTY1Ni40NDAxODEsInN1YiI6IjY3MjA2OGU0MjdiZDU3ZDkxZjYzNGRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bvDVOGO4YkH4kUgs109IqfGVL1qkTlHo1jxNNAAmmmA'
      }
    };

  const fetchMovies = () => {
    const { genre, rating, sortBy, year } = filters|| {};
    let url = `https://api.themoviedb.org/3/discover/movie?language=ko-KR&sort_by=${sortBy}&page=1`;

    if (genre) url += `&with_genres=${genre}`;
    if (rating) url += `&vote_average.gte=${rating}`;
    if (year) url += `&primary_release_year=${year}`;

    fetch(url, options)
      .then((response) => response.json())
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
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMovies(); // filters가 변경될 때마다 API 호출
  }, [filters]);

  const toggleLike = (movie) => {
    setLikedMovies((prev) => {

      let updatedLikes;
      if (prev.some((item) => item.id === movie.id)) {
        // If already liked, remove from wishlist
        updatedLikes = prev.filter((item) => item.id !== movie.id);
      } else {
        // If not liked, add to wishlist
        updatedLikes = [...prev, {
          id: movie.id,
          title: movie.title,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          genre_ids: movie.genre_ids,
        }];
      }
      // Save updated likes to localStorage
      localStorage.setItem('wishlist', JSON.stringify(updatedLikes));
      console.log("Wishlist saved to localStorage:", JSON.parse(localStorage.getItem('wishlist')));
      return updatedLikes;
    });
  };

  const scrollLeft = () => {
    cardsRef.current.scrollLeft -= 5 * 200; // 5개의 카드 너비만큼 이동
  };

  const scrollRight = () => {
    cardsRef.current.scrollLeft += 5 * 200; // 5개의 카드 너비만큼 이동
  };

  return (
    <div className="titlecards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="titlecard-container">
        <button onClick={scrollLeft} className="scroll-button">{"<"}</button>
        <div className="titlecard-list" ref={cardsRef}>
          {apiData.length > 0 ? (
            apiData.map((card) => (
              <div className="titlecard" key={card.id}>
                <div className="image-container">
                <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="cards" />
                  <div className="overlay">
                    <div className="icon-button" onClick={() => toggleLike(card)}>
                      <AiFillHeart size={25} cursor={"pointer"} color={likedMovies.some((item) => item.id === card.id)? 'red' : 'white'}/>
                    </div>
                    <div className="icon-button">
                      <FaComment size={20} color="white" />
                      <span className="count-text">{card.commentCount}</span>
                    </div>
                    </div>
                  <p>{card.title}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
        <button onClick={scrollRight} className="scroll-button">{">"}</button>
      </div>
    </div>
  );
};

TitleCards.propTypes = {
  title: PropTypes.string,
  filters: PropTypes.object.isRequired,
};

export default TitleCards