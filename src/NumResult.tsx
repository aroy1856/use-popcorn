import { MovieType } from "./type";

type NumResultProps = {
  movies: MovieType[];
};

export default function NumResult({ movies }: NumResultProps) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}
