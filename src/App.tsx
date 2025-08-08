import { useEffect, useState } from "react";

import { ApiResponse, MovieType, WatchedMovieType } from "./type";

import Main from "./Main";
import Navbar from "./Navbar";
import SearchBox from "./SearchBox";
import NumResult from "./NumResult";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchedMovieList from "./WatchedMovieList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [watched, setWatched] = useState<WatchedMovieType[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=c2759c15&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong while fetching movies");
        }

        const data: ApiResponse = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error || "No results found");
        }
        setMovies(data.Search || []);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError")
          setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    if (query.trim().length < 3) {
      setMovies([]);
      setError("");
      setIsLoading(false);
      return;
    }

    fetchMovies();

    return () => controller.abort();
  }, [query]);

  function handleSelectMovie(id: string) {
    setSelectedMovieId(id == selectedMovieId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleAddWatchedMovie(movie: WatchedMovieType) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleRemoveWatchedMovie(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <SearchBox query={query} onSetQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              movieId={selectedMovieId}
              watchedMovies={watched}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onRemoveWatchedMovie={handleRemoveWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
