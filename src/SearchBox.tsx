import { useState } from "react";

type SearchBoxProps = {
  query: string;
  onSetQuery: (query: string) => void;
};

export default function SearchBox({ query, onSetQuery }: SearchBoxProps) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}
