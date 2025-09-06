import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import PersonList from "./components/PersonList";

export default function App() {
const [results, setResults] = useState([])
const [loading, setLoading] = useState(false)
const [searchType, setSearchType] = useState("movie")

const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI3OWFmMTc5MmI2YTUyMTYzZmQ4NDUyODIyZjgzNCIsIm5iZiI6MTc1NzA1NzYxOS44NjksInN1YiI6IjY4YmE5MjUzMzhhZTRiZmFiNTFmNDNlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ueR0V98CKmTp4iWdQJyaD9JE86-D4XW54Diz2xJD1UE';

async function handleSearch(query, page = 1) {
  setLoading(true);
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/${searchType}?query=${encodeURIComponent(query)}&page=${page}&include_adult=false&language=en-US`,
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
    setResults(data.results || []);
  } catch (error) {
    console.error("API fetch error:", error);
    setResults([]);
  } finally {
    setLoading(false);
  }
}


  return (
<div className="min-h-screen bg-gray-100">
  <h1 className="text-3xl font-bold text-center py-6">Movie Scoper</h1>
  <SearchBar onSearch={handleSearch} searchType={searchType} onTypeChange={setSearchType} />
   {loading ? (
        <p className="text-center mt-8">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-center mt-8">No results yet. Try a search!</p>
      ) : searchType === "person" ? (
        <PersonList people={results} />
      ) : (
        <MovieList movies={results} /> // MovieList will handle both movies and tv
      )}
</div>
  );
}
