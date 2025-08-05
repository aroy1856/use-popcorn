import { WatchedMovieType } from "./type";
import WatchedMovie from "./WatchedMovie";

type WatchedMovieListProps = {
  watched: WatchedMovieType[];
};

export default function WatchedMovieList({ watched }: WatchedMovieListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
