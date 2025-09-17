import { useEffect, useState } from "react";
import RatingStar from "./RatingStar";

function MovieDetail({
  selectedMoviedID,
  handleSelectedMovie,
  handleAddWatch,
  watched,
}) {
  const [movieDetail, setMovieDetail] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setIsRating] = useState(null);

  const isAlreadyRated = watched.some(
    (movie) => movie.imdbId === selectedMoviedID
  );

  const userRating = watched.find(
    (movie) => movie.imdbId === selectedMoviedID
  )?.userRating;

  useEffect(() => {
    async function getMovieDetail() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=210ec08b&i=${selectedMoviedID}`
        );

        if (!response.ok) {
          throw new Error("Movie detail not found");
        }

        const data = await response.json();
        document.title = data.Title;
        setMovieDetail(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetail();

    return () => {
      document.title = "usePocorn";
    };
  }, [selectedMoviedID, movieDetail.Title]);

  useEffect(() => {
    const callback = function (e) {
      if (e.code === "Escape") {
        handleSelectedMovie(null);
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [handleSelectedMovie]);

  if (isLoading) return <div className="loader">Loading...</div>;

  if (error) return <div className="error">{error}</div>;

  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Director,
    Writer,
    imdbRating,
    Genre,
    Plot,
    Actors,
    Poster,
  } = movieDetail;

  function handleAdd() {
    const newMovie = {
      userRating: rating,
      imdbRating: Number(imdbRating),
      runTime: Number(Runtime.split(" ")[0]),
      poster: movieDetail.Poster,
      title: movieDetail.Title,
      imdbId: movieDetail.imdbID,
    };

    console.log("movie", newMovie);
    handleAddWatch(newMovie);
    handleSelectedMovie(null);
  }

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => handleSelectedMovie(null)}>
          &larr;
        </button>
        <img src={Poster} alt={`Poster of  movie`} />
        <div className="details-overview">
          <h2>{Title}</h2>
          <p>
            {Released} &bull; {Runtime}
          </p>
          <p>{Genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {!isAlreadyRated ? (
            <>
              <RatingStar setIsRating={setIsRating} />

              {rating && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <p>Your already rated : {userRating}</p>
          )}
        </div>
        <p>
          <em>{Plot}</em>
        </p>
        <p>Starring {Actors}</p>
        <p>Directed by {Director}</p>
      </section>
    </div>
  );
}

export default MovieDetail;
