import { useEffect, useState } from 'react';
import '../../components/TitleCards/TitleCards.css';
import { AiFillHeart } from 'react-icons/ai';
import MovieModal from '../../components/TitleCards/MovieModal'; // Import MovieModal
import { useDisclosure } from '@chakra-ui/react';
import logo from '../../assets/logo.png'; // Ensure logo path is correct

const Popular = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursor, setCursor] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null); // State for the selected movie
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal controls

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

  const loadMore = () => {
    if (!loading && hasMore) {
      setCursor((prev) => prev + 1);
    }
  };

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
        {getCurrentPageItems().length > 0 ? (
          getCurrentPageItems().map((movie) => (
            <div className="titlecard" key={movie.id}>
              <div className="image-container" onClick={() => openModal(movie)}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
              <div className="overlay">
                <div className="icon-button" onClick={(e) => { 
                  e.stopPropagation(); // Prevents modal opening when heart is clicked
                  // Implement wishlist toggle if necessary
                }}>
                  <AiFillHeart size={25} color="red" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No movies available.</p>
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
        <MovieModal movie={selectedMovie} isOpen={isOpen} onClose={onClose} />
      )}
    </div>
  );
};

export default Popular;
