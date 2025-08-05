export type MovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export type WatchedMovieType = MovieType & {
  runtime: number;
  userRating: number;
  imdbRating: number;
};
