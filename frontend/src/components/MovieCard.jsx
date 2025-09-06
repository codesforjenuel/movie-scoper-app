export default function MovieCard({ movie }) {
const title = movie.title || movie.name;
const date = movie.release_date || movie.first_air_date;

  return (
    <div className="bg-white shadow-md rounded overflow-hidden">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-2">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-sm text-gray-600">{date || "—"}</p>
      </div>
    </div>
  );
}
