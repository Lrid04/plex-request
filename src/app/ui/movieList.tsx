import { Movie } from "../lib/movie";
import MovieBlock from "./movieInfo";
import AdminMovieBlock from "./adminMovieInfo";

export default function MovieList(props: {
  requested: boolean;
  admin: boolean;
  movies: Movie[];
}) {

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 items-center justify-items-center md:px-10 px-5 py-5 gap-6 max-h-svh overflow-auto">
      {(props.admin &&
        props.movies
          .filter((object) => object.requested == props.requested)
          .map((movie: Movie) => (
            <AdminMovieBlock
              movie={movie}
              key={movie.movieId + Math.random()}
            />
          ))) ||
        props.movies
          .filter((object) => object.requested == props.requested)
          .map((movie: Movie) => (
            <MovieBlock
              movie={movie}
              summary={false}
              key={movie.movieId + Math.random()}
            />
          ))}
    </div>
  );
}
