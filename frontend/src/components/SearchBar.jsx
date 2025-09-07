import { useState, useEffect } from "react";

export default function SearchBar({ onSearch, searchType, onTypeChange, initialQuery }) {
  const [input, setInput] = useState(initialQuery || "");

  useEffect(() => {
    setInput(initialQuery || "");
  }, [initialQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-center items-center gap-2 py-6 bg-gray-900 p-4 rounded-lg shadow-md max-w-3xl mx-auto"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Search ${searchType}...`}
        className="w-full sm:w-64 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />

      <select
        value={searchType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="w-full sm:w-auto px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <option value="movie">Movies</option>
        <option value="tv">TV Shows</option>
        <option value="person">People</option>
      </select>

      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
      >
        Search
      </button>
    </form>
  );
}
