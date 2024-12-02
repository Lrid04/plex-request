import Image from "next/image"
import  { Movie } from "../page"

export default function MovieBlock(props: { movie: Movie }){
    console.log(props.movie)
    return(
        <div>
            <p>{props.movie['movieName']}</p>
            <p>{props.movie['releaseYear']}</p>
            <Image 
            src={`${props.movie['posterUrl']}`}
            alt="wow"
            width={200}
            height={200}/>
        </div>
    )
}