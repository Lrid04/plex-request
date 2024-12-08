"use client";
import { useEffect, useState } from "react";
import { Movie } from "../lib/movie";
import MovieBlock from "./movieInfo";

export default function MovieList(props: { requested: boolean }) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(handleLoad, []);

  function handleLoad() {
    fetch("/api/save")
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
        return [];
      })
      .then((load) => {
        setMovies(load["body"]);
        console.log(movies);
      })
      .catch((error) => console.error(error));
  }

  return movies
    .filter((object) => object.requested == props.requested)
    .map((movie: Movie) => (
      <MovieBlock movie={movie} key={movie.movieId + Math.random()} />
    ));
}
