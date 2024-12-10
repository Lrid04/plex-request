"use client";
import MovieBlock from "../ui/movieInfo";
import { redirect, useSearchParams } from "next/navigation";
import { Movie } from "../lib/movie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Suspense, useState } from "react";
import Loading from "../ui/loading";
import { Button } from "@nextui-org/react";

export default function Confirm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false)
  let requestedMovie: Movie;
  function Search() {
    let confirmData;
    const searchParm = useSearchParams();
    const data = searchParm.get("data");
    if (data != null) {
      confirmData = JSON.parse(data);
      requestedMovie = confirmData;
    }
    return <MovieBlock movie={confirmData} summary={true}/>;
  }

  function AddMovie() {
    setLoading(true)
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
          setLoading(false)
        } else {
          SuccessNotice("Movie Has Been Requested");
          router.replace("/requested");
          setTimeout(() => setLoading(false), 1000)
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
    <div className="min-h-max md:px-[25%] px-[15%] py-5">
      <Suspense fallback={<Loading />}>
        <Search />
        <div className="flex justify-center m-5">
          <Button isLoading={isLoading} onClick={AddMovie} variant="shadow" color="secondary" size="lg" className="mr-5">Confirm</Button>
          <Button onClick={() => redirect("/")} variant="shadow" color="secondary" size="lg" className="ml-5">Cancel</Button>
        </div>
      </Suspense>
    </div>
  );
}
