// src/pages/PersonDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN || "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI3OWFmMTc5MmI2YTUyMTYzZmQ4NDUyODIyZjgzNCIsIm5iZiI6MTc1NzA1NzYxOS44NjksInN1YiI6IjY4YmE5MjUzMzhhZTRiZmFiNTFmNDNlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ueR0V98CKmTp4iWdQJyaD9JE86-D4XW54Diz2xJD1UE";

export default function PersonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchPerson() {
      setLoading(true);
      setError(null);
      try {
        // Person details
        const res1 = await fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        if (!res1.ok) throw new Error("Failed to fetch person details");
        const personData = await res1.json();

        const res2 = await fetch(
          `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        if (!res2.ok) throw new Error("Failed to fetch credits");
        const creditsData = await res2.json();

        
        const knownFor = (creditsData.cast || [])
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
          .slice(0, 12);

        setPerson(personData);
        setCredits(knownFor);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load actor data");
      } finally {
        setLoading(false);
      }
    }

    fetchPerson();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading actor details...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  if (!person) return null;

  return (
   <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
  <button
    onClick={() => navigate(-1)}
    className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition"
  >
    ← Back
  </button>

  <div className="flex flex-col md:flex-row gap-8">
    {/* Profile Image */}
    <div className="md:w-1/3 w-full">
      <img
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
            : "/placeholder.png"
        }
        alt={person.name}
        className="w-full rounded shadow-lg"
      />
    </div>

    {/* Details */}
    <div className="md:w-2/3 w-full flex flex-col justify-between">
      <div>
        <h1 className="text-4xl font-bold mb-2 tracking-wide">{person.name}</h1>
        <p className="text-gray-300 text-sm mb-4">
          {person.place_of_birth ? `${person.place_of_birth} • ` : ""}
          {person.birthday ? `Born ${person.birthday}` : ""}
        </p>

        <h2 className="text-2xl font-semibold mb-3">Biography</h2>
        <p className="text-gray-200 mb-6 leading-relaxed">
          {person.biography || "No biography available."}
        </p>

        <h2 className="text-2xl font-semibold mb-3">Known for</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-x-auto">
          {credits.map((c) => (
            <div
              key={`${c.id}-${c.credit_id}`} // avoid duplicate key warning
              className="bg-gray-800 rounded overflow-hidden shadow hover:scale-105 transition-transform"
            >
              <img
                src={
                  c.poster_path || c.backdrop_path
                    ? `https://image.tmdb.org/t/p/w300${c.poster_path || c.backdrop_path}`
                    : "/placeholder.png"
                }
                alt={c.title || c.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-2">
                <div className="font-semibold line-clamp-1">{c.title || c.name}</div>
                <div className="text-gray-400 text-xs">
                  {c.media_type === "tv" ? "TV" : "Movie"} •{" "}
                  {(c.release_date || c.first_air_date || "—").slice(0, 4)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
