import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date;

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-white shadow-md rounded overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.png"
          }
          alt={title}
          className="w-full h-64 object-cover"
        />
        <div className="p-2">
          <h2 className="font-bold text-lg line-clamp-1">{title}</h2>
          <p className="text-sm text-gray-600">{date || "—"}</p>
        </div>
      </div>
    </Link>
  );
}