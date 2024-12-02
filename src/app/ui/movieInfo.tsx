import Image from "next/image"
import { Movie } from "../page"

export default function MovieBlock(props: { movie: Movie }){
    return(
        <div>
            <p>{props.movie['movieName']}</p>
            <p>{props.movie['releaseYear']}</p>
            <Image 
            src={`${props.movie['posterUrl']}`}
            alt="wow"
            width={100}
            height={200}/>
        </div>
    )
}