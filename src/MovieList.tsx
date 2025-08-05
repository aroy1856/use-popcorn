import Movie from "./Movie";
import { MovieType } from "./type";

type MovieListProps = {
  movies: MovieType[];
};

export default function MovieList({ movies }: MovieListProps) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
