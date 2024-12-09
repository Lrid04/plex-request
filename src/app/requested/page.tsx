"use client"
import dynamic from "next/dynamic";
import Loading from "../ui/loading";

const MovieList = dynamic(() => import("../ui/movieList"), {
  loading: () => <Loading />,
  ssr: false
});

export default function Requested() {
  return <MovieList requested={true} />;
}
