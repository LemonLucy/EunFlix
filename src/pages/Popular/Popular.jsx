import { useEffect, useState } from 'react';
import '../../components/TitleCards/TitleCards.css';
import { AiFillHeart } from 'react-icons/ai';
import MovieModal from '../../components/TitleCards/MovieModal'; // Import MovieModal
import {  Skeleton, useDisclosure } from '@chakra-ui/react';
import logo from '../../assets/logo.png'; // Ensure logo path is correct
import { useNavigate } from 'react-router-dom';
import useWishlist from '../../hooks/useWishlist';

const Popular = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const [, setHasMore] = useState(true);
  const [cursor, ] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const [wishlist, toggleWishlist] = useWishlist();
  const navigate=useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk0YzBkNGQ4ZTRlYjRiNjU3MjhlYTlkODNmZjNkOCIsIm5iZiI6MTczMDE4NTY1Ni40NDAxODEsInN1YiI6IjY3MjA2OGU0MjdiZDU3ZDkxZjYzNGRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bvDVOGO4YkH4kUgs109IqfGVL1qkTlHo1jxNNAAmmmA'
    }
  };

  const fetchData = async (cursor) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${cursor}`, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();

      const movies = result.results
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

      setData((prev) => [...prev, ...movies]);
      setHasMore(result.page < result.total_pages);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(cursor);
  }, [cursor]);

  const pageSize = 10; 
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    onOpen();
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="titlecards">
      <img src={logo} alt="Logo" onClick={() => navigate('/')} className="logo" />
      <h2>Popular on Eunflix</h2>
      <div className="titlecard-grid">
        {/* {getCurrentPageItems().length > 0 ? ( */}
          {loading ? (
            // Render 10 skeletons while loading
            Array.from({ length: pageSize }, (_, index) => (
              <Skeleton key={index} height="250px" width="100%" borderRadius="md" />
            ))
          ):(
          getCurrentPageItems().map((movie) => (
            <div className="titlecard" key={movie.id}>
              <div className="image-container" onClick={() => openModal(movie)}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                <p>{movie.title}</p>
                <div className="overlay">
                  <div className="icon-button" onClick={(e) => { 
                    e.stopPropagation(); // Prevents modal opening when heart is clicked
                    toggleWishlist(movie);
                  }}>
                    <AiFillHeart size={25} cursor={"pointer"} color={wishlist.some((item) => item.id === movie.id)? 'red' : 'white'}/>
                  </div>
                </div>
              </div>
            </div>
          ))
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

export default Popular;
