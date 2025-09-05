import { useState } from "react";
import SearchBar from "./components/SearchBar";

export default function App() {
const [movies, setMovies] = useState([])
const [loading, setLoading] = useState(false)
const apiKey = '91279af1792b6a52163fd8452822f834'

async function handleSearch(query) {
  setLoading(true); // show loading indicator
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`
    );
    const data = await res.json();
    console.log("Raw API data:", data); // inspect the results
    setMovies(data.results || []); // store movie results
  } catch (error) {
    console.error("API fetch error:", error);
    setMovies([]); // clear results on error
  } finally {
    setLoading(false); // hide loading indicator
  }
}

  return (
<>
<SearchBar onSearch={handleSearch} />
</>
  );
}
