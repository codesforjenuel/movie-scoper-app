import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function MovieDetails({ type = "movie" }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI3OWFmMTc5MmI2YTUyMTYzZmQ4NDUyODIyZjgzNCIsIm5iZiI6MTc1NzA1NzYxOS44NjksInN1YiI6IjY4YmE5MjUzMzhhZTRiZmFiNTFmNDNlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ueR0V98CKmTp4iWdQJyaD9JE86-D4XW54Diz2xJD1UE";

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);

        // Fetch movie or TV show details
        const resItem = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
          {
            headers: { Authorization: `Bearer ${apiToken}` },
          }
        );
        const itemData = await resItem.json();
        if (itemData.success === false) throw new Error(itemData.status_message);
        setItem(itemData);

        // Fetch credits
        const resCredits = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
          {
            headers: { Authorization: `Bearer ${apiToken}` },
          }
        );
        const creditsData = await resCredits.json();
        setCast(creditsData.cast?.slice(0, 10) || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id, type]);

  if (loading) return <p className="text-center mt-8 animate-pulse">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  if (!item) return <p className="text-center mt-8">No details found.</p>;

  const title = item.title || item.name; // movie = title, tv show = name
  const releaseDate = item.release_date || item.first_air_date;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
  <button
    onClick={() => navigate(-1)}
    className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition"
  >
    ← Back
  </button>

  <h1 className="text-4xl font-bold mb-4 tracking-wide">{title}</h1>

  <img
    src={
      item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "/placeholder.png"
    }
    alt={title}
    className="w-full h-auto rounded shadow-lg mb-6"
  />

  <p className="text-gray-300 mb-4 leading-relaxed">{item.overview || "No description available."}</p>

  <div className="flex gap-6 mb-6">
    <p><strong>Release Date:</strong> {releaseDate || "—"}</p>
    <p><strong>Rating:</strong> {item.vote_average || "—"}/10</p>
  </div>

  {cast.length > 0 && (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cast.map((actor) => (
          <Link
            key={actor.id}
            to={`/person/${actor.id}`}
            className="text-center bg-gray-800 rounded shadow hover:scale-105 transition-transform duration-200 overflow-hidden"
          >
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/150x225?text=No+Image"
              }
              alt={actor.name}
              className="w-full h-56 object-cover rounded-t"
            />
            <div className="p-2">
              <p className="text-sm font-medium truncate">{actor.name}</p>
              <p className="text-xs text-gray-400 truncate">{actor.character}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )}
</div>

  );
}
