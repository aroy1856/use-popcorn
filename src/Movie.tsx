import { MovieType } from "./type";

type MovieProps = {
  movie: MovieType;
  onSelectMovie: (id: string) => void;
};

export default function Movie({ movie, onSelectMovie }: MovieProps) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
