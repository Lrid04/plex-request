import { Movie } from "../lib/movie";
import MovieBlock from "./movieInfo";

export default function SearchList(props: { newMovies: Movie[], confirmMovie: CallableFunction }){

    return(
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 m-5 max-h-svh overflow-auto">
            {props.newMovies.map((movie: Movie) => (
            <MovieBlock
              movie={movie}
              summary={false}
              key={movie.movieId}
              confirmMovie={props.confirmMovie}
            />
          ))}
        </div>
    )
}