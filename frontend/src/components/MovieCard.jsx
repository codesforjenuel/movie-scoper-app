import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  // Determine path based on media_type
  const path =
    movie.media_type === "tv"
      ? `/tv/${movie.id}`
      : movie.media_type === "movie"
      ? `/movie/${movie.id}`
      : `/movie/${movie.id}`; // default to movie if unknown

  return (
    <div
      className="cursor-pointer transform hover:scale-105 transition-transform duration-300 bg-gray-900 hover:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      onClick={() => navigate(path)}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "/placeholder.png"
        }
        alt={movie.title || movie.name}
        className="w-full h-72 object-cover"
      />
      <div className="p-2">
        <p className="text-white font-semibold text-sm truncate">{movie.title || movie.name}</p>
        <p className="text-gray-400 text-xs">
          {movie.media_type === "tv" ? "TV Show" : "Movie"} •{" "}
          {(movie.release_date || movie.first_air_date || "—").slice(0, 4)}
        </p>
      </div>
    </div>
  );
}
