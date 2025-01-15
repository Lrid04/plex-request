"use client"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Authorization from "../lib/authorized";
import dynamic from "next/dynamic";
import Loading from "../ui/loading";
import { Movie } from "../lib/movie";

const MovieList = dynamic(() => import("../ui/movieList"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function Admin() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(handleLoad, []);

  function handleLoad() {
    fetch("/api/save")
      .then((res) => res.json())
      .then((load) => setMovies(load))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    isAuthorized();
  }, []);

  async function isAuthorized() {
    if (!(await Authorization())) {
      redirect("/");
    }
  }

  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl pt-5">Admin Page</h1>
      <MovieList requested={true} admin={true} movies={movies} />
    </div>
  );
}
