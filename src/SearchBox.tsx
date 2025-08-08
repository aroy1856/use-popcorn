import { useEffect, useRef, useState } from "react";

type SearchBoxProps = {
  query: string;
  onSetQuery: (query: string) => void;
};

export default function SearchBox({ query, onSetQuery }: SearchBoxProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current?.focus();
        onSetQuery("");
      }
    };
    document.addEventListener("keydown", callback);

    inputEl.current?.focus();
    return () => document.removeEventListener("keydown", callback);
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
