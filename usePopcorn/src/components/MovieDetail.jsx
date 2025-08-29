import { useEffect } from "react";

function MovieDetail({ selectedMoviedID, handleSelectedMovie }) {
  useEffect(() => {
    async function getMovieDetail() {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=210ec08b&i=${selectedMoviedID}`
        );

        const data = await response.json();
        console.log("data", data);
      } catch (error) {
        console.log("err", error);
      }
    }

    getMovieDetail();
  }, [selectedMoviedID]);

  return (
    <div>
      <button className="btn-back" onClick={() => handleSelectedMovie(null)}>
        ⬅️
      </button>
      {selectedMoviedID}
    </div>
  );
}

export default MovieDetail;
