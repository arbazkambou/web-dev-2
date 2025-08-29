import { useEffect, useState } from "react";
import Box from "./components/Box";
import Main from "./components/Main";
import MoviesList from "./components/MoviesList";
import Navbar from "./components/Navbar";
import SearchResult from "./components/SearchResult";
import WatchedMovies from "./components/WatchedMovies";
import WatchedSummary from "./components/WatchedSummary";
import { tempWatchedData } from "./data/sampleData";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovieID, setSelectedMovieID] = useState(null);

  function handleSelectedMovie(id) {
    if (id === selectedMovieID) {
      setSelectedMovieID(null);
    } else {
      setSelectedMovieID(id);
    }
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsError("");
          setIsLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=210ec08b&s=${query}`
          );

          if (!response.ok) {
            throw new Error(`HTPP Error:${response.status}`);
          }
          const data = await response.json();

          if (data.Response === "False") {
            throw new Error("Movie not found");
          }

          setMovies(data.Search);
          setIsLoading(false);
        } catch (error) {
          setIsError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length > 3) {
        fetchMovies();
      } else {
        setIsError("Please search something 🙂");
      }
    },
    [query]
  );

  // useEffect(() => {
  //   console.log("Every rerender");
  // });

  // useEffect(() => {
  //   console.log("When query change");
  // }, [query]);

  // useEffect(() => {
  //   console.log("Initial render");
  // }, []);

  // initial render
  // useEffect(() => {}, []);
  // initial render
  // useEffect(() => {}, [movies]);
  // initial render
  // useEffect(() => {});

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
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovies watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
