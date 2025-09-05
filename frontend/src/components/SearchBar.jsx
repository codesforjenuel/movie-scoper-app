import { useState } from "react";

export default function SearchBar({ onSearch }) {
    // Track the search input value
  const [query, setQuery] = useState();

  // Handle form submission
  function handleSubmit() {
    e.preventDefault();// prevent page refresh
   if (query.trim() !== "") {
    onSearch(query)// call parent function in App.jsx
   }
  }
  return (
    <form onSubmit={handleSubmit} className="flex justify-center my-4">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-l px-4 py-2 w-64 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
