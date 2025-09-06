import { useState } from "react";

export default function SearchBar({ onSearch, searchType, onTypeChange }) {
    // Track the search input value
  const [query, setQuery] = useState("");

  // Handle form submission
function handleSubmit(e) {
  e.preventDefault();
  console.log("Submitting query:", query); // check query value
  if (query.trim() !== "") {
    onSearch(query);
  }
}

  return (
    <form onSubmit={handleSubmit} className="flex justify-center my-4">
      <select className="border rounded p-2 bg-white"
      value={searchType}
      onChange={(event) => onTypeChange(event.target.value)}
      >
<option value="movie">Movies</option>
<option value="tv">TV</option>
<option value="person">Actors</option>
      </select>
      
      
      <input
  type="text"
  value={query} 
  onChange={(event) => setQuery(event.target.value)}
  placeholder={
    searchType === 'person' ? "Search actors"
    : searchType === 'movie' ? 'Search movies'
    :  "Search TV shows"
  }
  className="border rounded p-2 w-64"
/>
      <button
        type="submit"
        className="px-4 py-2 rounded bg-black text-white hover:opacity-90"
      >
        Search
      </button>
    </form>
  );
}
