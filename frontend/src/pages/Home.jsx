import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import PersonList from "../components/PersonList";

export default function Home() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("movie");

  const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI3OWFmMTc5MmI2YTUyMTYzZmQ4NDUyODIyZjgzNCIsIm5iZiI6MTc1NzA1NzYxOS44NjksInN1YiI6IjY4YmE5MjUzMzhhZTRiZmFiNTFmNDNlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ueR0V98CKmTp4iWdQJyaD9JE86-D4XW54Diz2xJD1UE";

  async function handleSearch(query, page = 1) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/${searchType}?query=${encodeURIComponent(
          query
        )}&page=${page}&include_adult=false&language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );

       const data = await res.json();

      // Tag each result with media_type to know what type it is
      const resultsWithType = (data.results || []).map((item) => ({
        ...item,
        media_type: searchType === "person" ? "person" : searchType,
      }));

      setResults(resultsWithType);
    } catch (error) {
      console.error("API fetch error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center py-8 tracking-wide text-yellow-400 drop-shadow-lg">
        Movie Scoper
      </h1>

      <div className="max-w-3xl mx-auto">
        <SearchBar
          onSearch={handleSearch}
          searchType={searchType}
          onTypeChange={setSearchType}
        />
      </div>

      {loading ? (
        <p className="text-center mt-8 text-gray-400 animate-pulse text-lg">
          🔄 Loading...
        </p>
      ) : results.length === 0 ? (
        <p className="text-center mt-8 text-gray-400 text-lg">
          🔍 No results yet. Try a search!
        </p>
      ) : searchType === "person" ? (
        <PersonList people={results} />
      ) : (
        <MovieList movies={results} />
      )}

      {/* Optional footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Movie Scoper. Built with ❤️ using TMDB API.
      </footer>
    </div>
  );
}