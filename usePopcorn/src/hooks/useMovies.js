import { useEffect, useState } from "react";

function useMovies(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsError("");
          setIsLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=210ec08b&s=${query}`,
            {
              signal: controller.signal,
            }
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
          if (error.name === "AbortError") return;
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

      return () => {
        controller.abort();
      };
    },

    [query]
  );

  return { isLoading, isError, movies };
}

export default useMovies;
