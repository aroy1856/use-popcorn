import { SyntheticEvent, use, useEffect, useState } from "react";
import { MovieDetailsType, WatchedMovieType } from "./type";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import StarRating from "./StarRating";

type SelectedMovieProps = {
  movieId: string | null;
  watchedMovies: WatchedMovieType[];
  onCloseMovie: () => void;
  onAddWatchedMovie: (movie: WatchedMovieType) => void;
};

export default function MovieDetails({
  movieId,
  watchedMovies,
  onCloseMovie,
  onAddWatchedMovie,
}: SelectedMovieProps) {
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    Title: title,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
  } = movie || {};

  const watched = !!watchedMovies.find((w) => w.imdbID === movieId);
  const watchedUserRating = watchedMovies.find(
    (w) => w.imdbID === movieId
  )?.userRating;

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    };
    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [onCloseMovie]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `https://www.omdbapi.com/?i=${movieId}&apikey=c2759c15`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Details of ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  function handleAdd() {
    const watchedMovie: WatchedMovieType = {
      imdbID: movieId || "",
      Title: title || "",
      Year: released || "",
      Poster: poster || "",
      runtime: Number(runtime?.replace("min", "").trim()) || 0,
      userRating: userRating,
      imdbRating: Number(imdbRating) || 0,
    };

    onAddWatchedMovie(watchedMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && movie && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>

            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!watched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    defaultRating={userRating}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You have rated this movie {watchedUserRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
