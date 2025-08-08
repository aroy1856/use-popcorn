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

export type ApiResponse = {
  Search?: MovieType[];
  totalResults?: string;
  Response: string;
  Error?: string;
};

type Rating = {
  Source: string;
  Value: string;
};

export type MovieDetailsType = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string; // "True" or "False"
  Error?: string; // Present when Response is "False"
};
