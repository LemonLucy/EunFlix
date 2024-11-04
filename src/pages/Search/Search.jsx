import './Search.css';
import { useEffect, useState } from 'react';
import TitleCards from '../../components/TitleCards/TitleCards';

const Search = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    rating: '',
    sortBy: 'popularity.desc',
    year: '',
  });

  const loadMoviesFromLocalStorage = () => {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    let movies = [...storedMovies];

    // Apply filters
    if (filters.genre) {
      movies = movies.filter((movie) => movie.genre_ids.includes(parseInt(filters.genre)));
    }
    if (filters.rating) {
      movies = movies.filter((movie) => movie.vote_average >= parseFloat(filters.rating));
    }
    if (filters.year) {
      movies = movies.filter((movie) => movie.release_date.startsWith(filters.year));
    }

    // Sorting
    if (filters.sortBy === 'popularity.desc') {
      movies.sort((a, b) => b.popularity - a.popularity);
    } else if (filters.sortBy === 'vote_average.desc') {
      movies.sort((a, b) => b.vote_average - a.vote_average);
    } else if (filters.sortBy === 'release_date.desc') {
      movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    }

    setFilteredData(movies);
  };

  useEffect(() => {
    loadMoviesFromLocalStorage();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      genre: '',
      rating: '',
      sortBy: 'popularity.desc',
      year: '',
    });
  };

  return (
    <div className="search-page">
      <h1>Movie Search</h1>

      {/* Filter UI */}
      <div className="filters">
        <select name="genre" value={filters.genre} onChange={handleFilterChange}>
          <option value="">All Genres</option>
          {/* Add genre options here */}
        </select>

        <select name="rating" value={filters.rating} onChange={handleFilterChange}>
          <option value="">All Ratings</option>
          <option value="8">8+</option>
          <option value="7">7+</option>
          <option value="6">6+</option>
        </select>

        <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
          <option value="popularity.desc">Most Popular</option>
          <option value="release_date.desc">Latest Releases</option>
          <option value="vote_average.desc">Top Rated</option>
        </select>

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={filters.year}
          onChange={handleFilterChange}
        />

        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      {/* TitleCards 컴포넌트에 필터링된 데이터를 전달 */}
      <TitleCards title="Search Results" apiData={filteredData} />
    </div>
  );
}

export default Search