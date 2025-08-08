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
import { useMovies } from "./hooks/useMovies";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [watched, setWatched] = useState<WatchedMovieType[]>(() => {
    const watched = localStorage.getItem("watched");
    return watched ? JSON.parse(watched) : [];
  });

  const { isLoading, error, movies } = useMovies(query);

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

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

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
