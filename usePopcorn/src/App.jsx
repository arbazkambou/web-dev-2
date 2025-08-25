import { useState } from "react";
import Box from "./components/Box";
import Main from "./components/Main";
import MoviesList from "./components/MoviesList";
import Navbar from "./components/Navbar";
import SearchResult from "./components/SearchResult";
import WatchedMovies from "./components/WatchedMovies";
import WatchedSummary from "./components/WatchedSummary";
import { tempMovieData, tempWatchedData } from "./data/sampleData";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar>
        <SearchResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          <MoviesList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovies watched={watched} />
        </Box>
      </Main>
    </>
  );
}
