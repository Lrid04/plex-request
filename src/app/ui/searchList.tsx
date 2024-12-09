import { Movie } from "../lib/movie";
import MovieBlock from "./movieInfo";

export default function SearchList(props: { newMovies: Movie[] , confirmMovie: CallableFunction }){

    return(
        <div className="grid md:grid-cols-2 grid-cols-1 gap-12 m-5 max-h-svh overflow-auto">
            {props.newMovies.map((movie: Movie) => (
            <MovieBlock
              movie={movie}
              key={movie.movieId}
              confirmMovie={props.confirmMovie}
            />
          ))}
        </div>
    )
}