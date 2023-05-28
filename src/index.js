import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=YOUR_API_KEY`
      );
      
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      
      {error && <p className="error">Invalid movie name. Please try again.</p>}
      
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <img src={movie.Poster} alt={movie.Title} />
            <div>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
