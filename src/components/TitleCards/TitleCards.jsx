import './TitleCards.css'
import { useRef,useEffect, useState } from 'react'
import PropTypes from 'prop-types';

const TitleCards = ({title, category}) => {

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

  // 로컬 스토리지에 영화 데이터 저장 함수
  const saveToLocalStorage = (movies) => {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const newMovies = movies.filter(
      (movie) => !storedMovies.some((stored) => stored.id === movie.id)
    );

    if (newMovies.length > 0) {
      localStorage.setItem('movies', JSON.stringify([...storedMovies, ...newMovies]));
    }
  };

  useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=ko-KR&page=1`, options)
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
        saveToLocalStorage(movies); // 로컬 스토리지에 저장
      })
      .catch(err => console.error(err));

      cardsRef.current.addEventListener('wheel', handleWheel);
  },[category])

  return (
    <div className='titlecards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="titlecard-list" ref={cardsRef}>
        {apiData.length > 0 ? (
            apiData.map((card,index)=>{
                return (
                <div className="titlecard" key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="cards" 
                   />
                    <p>{card.original_title}</p>
                </div>)
            })
        ):(
          <p>No data available</p>
        )
          }
        </div>
    </div>
  )
}
TitleCards.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string
};

export default TitleCards