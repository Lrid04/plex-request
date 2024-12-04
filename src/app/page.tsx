"use client";
import { useState, useEffect, FormEvent } from "react";
import data from "./data/movies.json";
import MovieBlock from "./ui/movieInfo";
import NavBar from "./ui/header";
import { Movie } from "./lib/movie";
import { FetchMovies } from "./lib/fetchMovies";
import { useRouter } from "next/navigation";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    setMovies(data);
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const movieName = formData.get("movieName");
    const movieYear = formData.get("movieYear");
    if (movieName != null) {
      const movieSelection : Movie[] = FetchMovies(movieName, movieYear);
      setNewMovies(movieSelection);
      console.log(movieSelection)
      router.refresh();
    }
    console.log(movieName, movieYear);
  }

  return (
    <div className="flex flex-col justify-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <NavBar />
      </div>
      <div>
        <form onSubmit={handleSearch}>
          <label htmlFor="movieName">MovieName</label>
          <input
            type="text"
            id="movieName"
            name="movieName"
            className="text-black"
          />
          <label htmlFor="movieYear">MovieYear</label>
          <input
            type="number"
            name="movieYear"
            id="movieYear"
            className="text-black"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="grid grid-cols-2 grid-flow-rows">
        {newMovies.map((movie: Movie) => (
          <MovieBlock movie={movie} key={movie.movieId} />
        ))}
      </div>
    </div>
  );
}
