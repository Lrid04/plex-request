"use client";
import { useState, FormEvent } from "react";
import { Movie } from "./lib/movie";
import { FetchMovies } from "./lib/fetchMovies";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Loading from "./ui/loading";
import { Button, Form, Input } from "@nextui-org/react";

const SearchList = dynamic(() => import("./ui/searchList"), {
  loading: () => <Loading />
});

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
    const encodeUrl = encodeURIComponent(JSON.stringify(filteredMovie));
    router.push(`/confirm?data=${encodeUrl}`);
  }

  return (
    <div className="flex flex-col md:flex-row max-h-svh mt-5">
      <div className="basis-1/4 mx-10">
        <Form
          onSubmit={handleSearch}
          validationBehavior="native"
          className="flex items-center bg-secondary rounded p-5 border-8 border-primary"
        >
          <Input
            isRequired
            name="movieName"
            label="Movie Name"
            labelPlacement="inside"
            errorMessage="Movie Name is Required"
            size="lg"
          />
          <Input
            name="movieYear"
            label="Movie Year"
            labelPlacement="inside"
            type="number"
            size="lg"
            isClearable
          />
          <Button type="submit" size="lg">Submit</Button>
        </Form>
      </div>
      <div className="basis-3/4">
        <SearchList newMovies={newMovies} confirmMovie={confirmMovie} />
      </div>
    </div>
  );
}
