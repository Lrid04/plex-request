import data from "../data/movies.json"
import { Movie } from "../page"
import MovieBlock from "../ui/movieInfo"
import NavBar from '../ui/header'

export default function Requested(){

    return(
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <NavBar />
            <div className='grid grid-cols-2 grid-flow-rows'>
                {data.filter((object) => object.requested == true).map((movie: Movie) => (
                <MovieBlock movie={movie} key={movie.movieId}/>
                ))}
            </div>
        </div>
    )
}