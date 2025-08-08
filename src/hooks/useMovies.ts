import { useEffect, useState } from "react";
import { ApiResponse, MovieType } from "../type";

export function useMovies(query: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    // callback?.();

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

  return { isLoading, error, movies };
}
