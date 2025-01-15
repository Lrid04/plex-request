"use client"
import dynamic from "next/dynamic";
import Loading from "../ui/loading";
import { useEffect, useState } from "react";
import { Movie } from "../lib/movie";

const MovieList = dynamic(() => import("../ui/movieList"), {
  loading: () => <Loading />,
  ssr: false
});

export default function Collection() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(handleLoad, []);

  function handleLoad() {
    fetch("/api/save")
      .then((res) => res.json())
      .then((load) => setMovies(load))
      .catch((error) => console.error(error));
  }
  return <MovieList requested={false} admin={false} movies={movies}/>;
}
