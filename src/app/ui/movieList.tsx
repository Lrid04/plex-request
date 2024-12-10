"use client"
import { useEffect, useState } from "react";
import { Movie } from "../lib/movie";
import MovieBlock from "./movieInfo";

export default function MovieList(props: { requested: boolean }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  
  useEffect(handleLoad, [])

  function handleLoad(){
    fetch("/api/save")
    .then((res) => res.json())
    .then((load) => setMovies(load))
    .catch((error) => console.error(error));
  }
  
  return (
    <div className="grid md:grid-cols-4 grid-cols-1 items-center justify-items-center md:mx-10 mx-5 mt-8 gap-6 max-h-svh overflow-auto">
      {movies
        .filter((object) => object.requested == props.requested)
        .map((movie: Movie) => (
          <MovieBlock movie={movie} summary={false} key={movie.movieId + Math.random()} />
        ))}
    </div>
  );
}
