import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";

export default function App() {
const [movies, setMovies] = useState([])
const [loading, setLoading] = useState(false)
const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI3OWFmMTc5MmI2YTUyMTYzZmQ4NDUyODIyZjgzNCIsIm5iZiI6MTc1NzA1NzYxOS44NjksInN1YiI6IjY4YmE5MjUzMzhhZTRiZmFiNTFmNDNlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ueR0V98CKmTp4iWdQJyaD9JE86-D4XW54Diz2xJD1UE';

async function handleSearch(query) {
  setLoading(true);
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=1&include_adult=false&language=en-US`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );

    const data = await res.json();
    console.log("Raw API data:", data);
    setMovies(data.results || []);
  } catch (error) {
    console.error("API fetch error:", error);
    setMovies([]);
  } finally {
    setLoading(false);
  }
}


  return (
<div className="min-h-screen bg-gray-100">
  <h1 className="text-3xl font-bold text-center py-6">Movie Scoper</h1>
  <SearchBar onSearch={handleSearch} />
  {loading ? (
    <p className="text-center mt-8">Loading...</p>
  ) : (
    <MovieList movies={movies} />
  )}
  {!loading && movies.length === 0 && (
  <p className="text-center mt-8">No movies found. Try another search!</p>
)}
</div>
  );
}
