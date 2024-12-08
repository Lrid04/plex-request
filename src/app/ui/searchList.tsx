import { Movie } from "../lib/movie";
import MovieBlock from "./movieInfo";

export default function SearchList(props: { newMovies: Movie[] , confirmMovie: CallableFunction }){

    return(
        <div className="grid grid-cols-2 grid-flow-rows max-h-max overflow-auto">
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