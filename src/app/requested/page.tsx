import dynamic from "next/dynamic";
import Loading from "../ui/loading";
import NavBar from "../ui/header";

const MovieList = dynamic(()=> import("../ui/movieList"), {loading: () => <Loading />})

export default function Requested() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      
      <div className="grid grid-cols-2 grid-flow-rows items-center justify-items-center mx-10 pb-20 gap-16 sm:p-20 max-h-screen overflow-auto">
        <MovieList requested={true}/>
      </div>
    </div>
  );
}
