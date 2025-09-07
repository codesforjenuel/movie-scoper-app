import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 p-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-200"
      >
        Movie Scoper
      </Link>
      <div className="text-sm text-gray-900/80 italic">
        Built with <span className="font-semibold">TMDb</span>
      </div>
    </nav>
  );
}
