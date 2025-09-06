export default function PersonCard({person}) {
    return (
        <div className="bg-white shadow-md rounded overflow-hidden">
<img src={
    person.profile_path
    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
    : "https://via.placeholder.com/300x450?text=no+image"
} 
alt={person.name}
className="w-full h-64 object-cover"
/>
<div className="p-3">
<h2 className="font-bold text-lg">{person.name}</h2>
 {/* Known for (first 3 items) */}
        {Array.isArray(person.known_for) && person.known_for.length > 0 && (
          <ul className="mt-2 text-sm text-gray-700 space-y-1">
            {person.known_for.slice(0, 3).map((k) => (
              <li key={k.id} className="line-clamp-1">
                • {(k.title || k.name) ?? "Untitled"}{" "}
                <span className="text-gray-500">
                  ({k.media_type === "tv" ? "TV" : "Movie"})
                </span>
              </li>
            ))}
          </ul>
        )}
</div>
        </div>
    )
}