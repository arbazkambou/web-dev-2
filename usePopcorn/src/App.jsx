import { useEffect, useState } from "react";
import Box from "./components/Box";
import Main from "./components/Main";
import MoviesList from "./components/MoviesList";
import Navbar from "./components/Navbar";
import SearchResult from "./components/SearchResult";
import WatchedMovies from "./components/WatchedMovies";
import WatchedSummary from "./components/WatchedSummary";
import { tempWatchedData } from "./data/sampleData";

const API = "http://www.omdbapi.com/?apikey=210ec08b&s=inception";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const response = await fetch(API);

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

    fetchMovies();
  }, []);

  // initial render
  // useEffect(() => {}, []);
  // initial render
  // useEffect(() => {}, [movies]);
  // initial render
  // useEffect(() => {});

  return (
    <>
      <Navbar>
        <SearchResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isError && <p className="error">{isError}</p>}
          {isLoading && <div className="loader">Loading...</div>}
          {!isLoading && !isError && <MoviesList movies={movies} />}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovies watched={watched} />
        </Box>
      </Main>
    </>
  );
}
