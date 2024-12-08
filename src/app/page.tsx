"use client";
import { useState, FormEvent } from "react";
import { Movie } from "./lib/movie";
import { FetchMovies } from "./lib/fetchMovies";
import { useRouter } from "next/navigation";
import NavBar from "./ui/header";
import dynamic from "next/dynamic";
import Loading from "./ui/loading";

const SearchList = dynamic(() => import("./ui/searchList"), {loading: () => <Loading />})

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
    setTimeout(router.refresh, 200);
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
          <SearchList newMovies={newMovies} confirmMovie={confirmMovie} />
      </div>
    </div>
  );
}
