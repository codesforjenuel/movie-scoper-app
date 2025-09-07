import { Link } from "react-router-dom";

export default function PersonCard({ person }) {
  return (
    <Link to={`/person/${person.id}`} className="block">
      <div className="bg-white shadow-md rounded overflow-hidden cursor-pointer hover:shadow-lg transition">
        <img
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
              : "/placeholder.png"
          }
          alt={person.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-3">
          <h2 className="font-bold text-lg">{person.name}</h2>
        </div>
      </div>
    </Link>
  );
}