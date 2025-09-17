import { useState } from "react";
import Box from "./components/Box";
import Main from "./components/Main";
import MovieDetail from "./components/MovieDetail";
import MoviesList from "./components/MoviesList";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import SearchResult from "./components/SearchResult";
import WatchedMovies from "./components/WatchedMovies";
import WatchedSummary from "./components/WatchedSummary";
import useLocaleStorage from "./hooks/useLocaleStorage";
import useMovies from "./hooks/useMovies";

export default function App() {
  const [watched, setWatched] = useLocaleStorage("watched", []);

  const [query, setQuery] = useState("");
  const { isError, isLoading, movies } = useMovies(query);

  const [selectedMovieID, setSelectedMovieID] = useState(null);

  function handleSelectedMovie(id) {
    if (id === selectedMovieID) {
      setSelectedMovieID(null);
    } else {
      setSelectedMovieID(id);
    }
  }

  function handleAddWatch(movie) {
    setWatched((movies) => [...movies, movie]);
  }

  function handleDelete(id) {
    setWatched((movies) => movies.filter((mov) => mov.imdbId !== id));
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isError && <p className="error">{isError}</p>}
          {isLoading && <div className="loader">Loading...</div>}
          {!isLoading && !isError && (
            <MoviesList
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
        </Box>
        <Box>
          {selectedMovieID ? (
            <MovieDetail
              selectedMoviedID={selectedMovieID}
              handleSelectedMovie={handleSelectedMovie}
              handleAddWatch={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovies watched={watched} handleDelete={handleDelete} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
