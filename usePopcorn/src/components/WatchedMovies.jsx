import WatchedMovie from "./WatchedMovie";

function WatchedMovies({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedMovie movie={movie} key={index} />
      ))}
    </ul>
  );
}

export default WatchedMovies;
