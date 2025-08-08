import Movie from "./Movie";
import { MovieType } from "./type";

type MovieListProps = {
  movies: MovieType[];
  onSelectMovie: (id: string) => void;
};

export default function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
