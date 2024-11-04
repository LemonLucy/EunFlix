import './TitleCards.css'
import { useRef,useEffect, useState } from 'react'
import PropTypes from 'prop-types';

const TitleCards = ({title, filters= {}}) => {

  const cardsRef =useRef();
  const [apiData, setApiData]=useState([])

  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk0YzBkNGQ4ZTRlYjRiNjU3MjhlYTlkODNmZjNkOCIsIm5iZiI6MTczMDE4NTY1Ni40NDAxODEsInN1YiI6IjY3MjA2OGU0MjdiZDU3ZDkxZjYzNGRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bvDVOGO4YkH4kUgs109IqfGVL1qkTlHo1jxNNAAmmmA'
      }
    };

  const handleWheel = (event) =>{
      event.preventDefault;
      cardsRef.current.scrollLeft += event.deltaY;
  }

  // // 로컬 스토리지에 영화 데이터 저장 함수
  // const saveToLocalStorage = (movies) => {
  //   const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
  //   const newMovies = movies.filter(
  //     (movie) => !storedMovies.some((stored) => stored.id === movie.id)
  //   );

  //   if (newMovies.length > 0) {
  //     localStorage.setItem('movies', JSON.stringify([...storedMovies, ...newMovies]));
  //   }
  // };

  const fetchMovies = () => {
    const { genre, rating, sortBy, year } = filters|| {};
    let url = `https://api.themoviedb.org/3/discover/movie?language=ko-KR&sort_by=${sortBy}&page=1`;

    if (genre) url += `&with_genres=${genre}`;
    if (rating) url += `&vote_average.gte=${rating}`;
    if (year) url += `&primary_release_year=${year}`;

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        const movies = response.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
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

  useEffect(() => {
    cardsRef.current.addEventListener('wheel', handleWheel);
    return () => cardsRef.current.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="titlecards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="titlecard-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card, index) => (
            <div className="titlecard" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="cards" />
              <p>{card.title}</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

TitleCards.propTypes = {
  title: PropTypes.string,
  filters: PropTypes.object.isRequired,
};

export default TitleCards