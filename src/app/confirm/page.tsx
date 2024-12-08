"use client";
import MovieBlock from "../ui/movieInfo";
import { redirect, useSearchParams } from "next/navigation";
import { Movie } from "../lib/movie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import Loading from "../ui/loading";
import NavBar from "../ui/header";

export default function Confirm() {
  const router = useRouter();
  let requestedMovie: Movie;
  function Search() {
    let confirmData;
    const searchParm = useSearchParams();
    const data = searchParm.get("data");
    if (data != null) {
      confirmData = JSON.parse(data);
      requestedMovie = confirmData;
    }
    return <MovieBlock movie={confirmData} />;
  }

  function AddMovie() {
    requestedMovie["requested"] = true;
    fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestedMovie),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json["status"] == 500) {
          ErrorNotice(json["message"]);
        } else {
          SuccessNotice("Movie Has Been Requested");
          router.push("/");
        }
      })
      .catch((error) => console.error(error));
  }

  function ErrorNotice(error: string | null) {
    toast.error(error);
  }

  function SuccessNotice(error: string | null) {
    toast.success(error);
  }

  return (
    <div className="min-h-max">
      <NavBar />
      <Suspense fallback={<Loading />}>
        <Search />
        <button onClick={AddMovie}>Confirm</button>
        <button onClick={() => redirect("/")}>Cancel</button>
      </Suspense>
    </div>
  );
}
