import './Search.css';
import {  useState } from 'react';
import TitleCards from '../../components/TitleCards/TitleCards';

const Search = () => {
  const [filters, setFilters] = useState({
    genre: '',
    rating: '',
    sortBy: 'popularity.desc',
    year: '',
  });

  const [, setAppliedFilters] = useState(filters);

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
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
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

        <button onClick={resetFilters}>Reset</button>
      </div>

      {/* TitleCards 컴포넌트에 필터링 조건을 전달 */}
      <TitleCards title="Search Results" filters={filters} />
    </div>
  );
};

export default Search