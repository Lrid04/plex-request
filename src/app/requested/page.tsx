import dynamic from "next/dynamic";
import Loading from "../ui/loading";

const MovieList = dynamic(() => import("../ui/movieList"), {
  loading: () => <Loading />,
});

export default function Requested() {
  return (
    <div className="grid grid-cols-2 grid-flow-rows items-center justify-items-center mx-10 pb-20 gap-16 sm:p-20 max-h-svh overflow-auto">
      <MovieList requested={true} />
    </div>
  );
}
