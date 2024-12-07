"use client";
import { useState, FormEvent } from "react";
import MovieBlock from "./ui/movieInfo";
import { Movie } from "./lib/movie";
import { FetchMovies } from "./lib/fetchMovies";
import { useRouter } from "next/navigation";
import NavBar from "./ui/header";

export default function Home() {
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const router = useRouter();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const movieName = formData.get("movieName");
    const movieYear = formData.get("movieYear");
    if (movieName != null) {
      const movieSelection: Movie[] = FetchMovies(movieName, movieYear);
      setNewMovies(movieSelection);
    }
    setTimeout(router.refresh, 500);
  }

  function confirmMovie(movieId: number) {
    const filteredMovie: Movie = newMovies.filter(
      (e) => e.movieId == movieId
    )[0];
    router.push(`/confirm?data=${JSON.stringify(filteredMovie)}`);
  }

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <div className="flex flex-col justify-center max-h-screen">
        <div>
          <form onSubmit={handleSearch} className="flex flex-col">
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
        <div className="grid grid-cols-2 grid-flow-rows max-h-max overflow-auto">
          {newMovies.map((movie: Movie) => (
            <MovieBlock
              movie={movie}
              key={movie.movieId}
              confirmMovie={confirmMovie}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
