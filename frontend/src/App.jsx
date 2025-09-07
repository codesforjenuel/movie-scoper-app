import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import PersonDetails from "./pages/PersonDetails";
import Nav from "./components/Navbar";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/movie/:id" element={<MovieDetails type="movie" />} />
<Route path="/tv/:id" element={<MovieDetails type="tv" />} />
<Route path="/person/:id" element={<PersonDetails />} />
</Routes>

    </>
  );
}
