import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI3OWFmMTc5MmI2YTUyMTYzZmQ4NDUyODIyZjgzNCIsIm5iZiI6MTc1NzA1NzYxOS44NjksInN1YiI6IjY4YmE5MjUzMzhhZTRiZmFiNTFmNDNlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ueR0V98CKmTp4iWdQJyaD9JE86-D4XW54Diz2xJD1UE";

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: { Authorization: `Bearer ${apiToken}` },
          }
        );
        const data = await res.json();
        if (data.success === false) throw new Error(data.status_message);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  if (!movie) return <p className="text-center mt-8">No details found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder.png"
        }
        alt={movie.title}
        className="w-full h-auto rounded shadow-md mb-4"
      />
      <p className="text-gray-700 mb-4">{movie.overview || "No description available."}</p>
      <p><strong>Release Date:</strong> {movie.release_date || "—"}</p>
      <p><strong>Rating:</strong> {movie.vote_average || "—"}/10</p>
    </div>
  );
}
