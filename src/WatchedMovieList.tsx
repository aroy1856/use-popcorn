import { WatchedMovieType } from "./type";
import WatchedMovie from "./WatchedMovie";

type WatchedMovieListProps = {
  watched: WatchedMovieType[];
  onRemoveWatchedMovie: (id: string) => void;
};

export default function WatchedMovieList({
  watched,
  onRemoveWatchedMovie,
}: WatchedMovieListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onRemoveWatchedMovie={onRemoveWatchedMovie}
        />
      ))}
    </ul>
  );
}
