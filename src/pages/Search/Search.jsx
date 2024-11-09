import './Search.css';
import {  useState } from 'react';
import TitleCards from '../../components/TitleCards/TitleCards';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Search = () => {
  const [filters, setFilters] = useState({
    genre: '',
    rating: '',
    sortBy: 'popularity.desc',
    search: '',
  });
  const navigate=useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [suggestions, setSuggestions] = useState([]); // Store previous keywords
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Safely parse the keywords from localStorage, or initialize as an empty array
    const storedKeywords = JSON.parse(localStorage.getItem('searchKeywords')) || [];
    setSuggestions(storedKeywords);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const handleSearchSubmit = () => {
    const { search } = filters;

    if (search) {
      // Retrieve existing search keywords array from localStorage, or initialize an empty array
      const storedKeywords = JSON.parse(localStorage.getItem('searchKeywords')) || [];

      // Add the new search keyword if it doesn't already exist
      if (!storedKeywords.includes(search)) {
        storedKeywords.push(search);
        // Save the updated array back to localStorage
        localStorage.setItem('searchKeywords', JSON.stringify(storedKeywords));

      }

      setSuggestions(storedKeywords);
      setShowSuggestions(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      genre: '',
      rating: '',
      sortBy: 'popularity.desc',
      search: '',
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFocus = () => {
    setShowSuggestions(true); // Show suggestions when search input is focused
  };

  const handleSuggestionClick = (keyword) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: keyword,
    }));
    setShowSuggestions(false); // Hide suggestions after selecting a keyword
  };

  return (
    <div className="search-page">
      <img src={logo} alt="" onClick={() => navigate('/')} className="search-logo"  />
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

        <div className="search-input-wrapper" style={{ position: "relative" }}>
          <input
            type="text"
            name="search"
            placeholder="Search by word"
            value={filters.search}
            onChange={handleFilterChange}
            onFocus={handleFocus} // Show suggestions on focus
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions &&suggestions && suggestions.length > 0 && (
              <ul className="suggestions-dropdown">
                {suggestions.map((keyword, index) => (
                  <li key={index} onMouseDown={() => handleSuggestionClick(keyword)}>
                    {keyword}
                  </li>
                ))}
              </ul>
          )}
        </div>
        <button onClick={handleSearchSubmit}>Search</button>
        <button onClick={resetFilters}>Reset</button>
      </div>

      {/* TitleCards 컴포넌트에 필터링 조건을 전달 */}
      <TitleCards title="Search Results" filters={filters} 
      currentPage={currentPage} onPageChange={handlePageChange}/>
    </div>
  );
};

export default Search