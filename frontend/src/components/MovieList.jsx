import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
      {movies.map((movie) => (
        // Default to 'movie' if media_type is undefined
        <MovieCard
          key={movie.id}
          movie={{ ...movie, media_type: movie.media_type || "movie" }}
        />
      ))}
    </div>
  );
}

