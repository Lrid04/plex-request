"use client";
import MovieBlock from "../ui/movieInfo";
import { redirect, useSearchParams } from "next/navigation";
import { Movie } from "../lib/movie";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Loading from "../ui/loading";
import { Button } from "@nextui-org/react";
import { ErrorNotice, SuccessNotice } from "../lib/toastControl";

export default function Confirm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  let requestedMovie: Movie;
  function Search() {
    let confirmData;
    const searchParm = useSearchParams();
    const data = searchParm.get("data");
    if (data != null) {
      confirmData = JSON.parse(data);
      requestedMovie = confirmData;
    }
    return <MovieBlock movie={confirmData} summary={true} />;
  }

  function AddMovie() {
    setLoading(true);
    requestedMovie["requested"] = true;
    fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestedMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 401) {
          ErrorNotice(data.message);
          router.replace("/");
          setTimeout(() => setLoading(false), 1000);
          return;
        }
        SuccessNotice("Movie Has Been Requested");
        router.replace("/requested");
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="min-h-max md:px-[25%] px-[15%] py-5">
      <Suspense fallback={<Loading />}>
        <Search />
        <div className="flex justify-center m-5">
          <Button
            isLoading={isLoading}
            onClick={AddMovie}
            onTouchStart={AddMovie}
            variant="shadow"
            color="secondary"
            size="lg"
            className="mr-5"
          >
            Confirm
          </Button>
          <Button
            onClick={() => redirect("/")}
            onTouchStart={() => redirect("/")}
            variant="shadow"
            color="secondary"
            size="lg"
            className="ml-5"
          >
            Cancel
          </Button>
        </div>
      </Suspense>
    </div>
  );
}
