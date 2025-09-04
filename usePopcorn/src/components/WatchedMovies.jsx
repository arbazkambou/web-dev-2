import WatchedMovie from "./WatchedMovie";

function WatchedMovies({ watched, handleDelete }) {
  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedMovie movie={movie} key={index} handleDelete={handleDelete} />
      ))}
    </ul>
  );
}

export default WatchedMovies;
