import Image from "next/image";
import { Movie } from "../lib/movie";

interface MovieBlock {
  props: {
    movie: Movie;
    confirmMovie?: CallableFunction;
  };
}

export default function MovieBlock(props: {
  movie: Movie;
  confirmMovie?: CallableFunction | undefined;
}) {
  let poster = "";
  if (props.movie["posterUrl"] == null) {
    poster =
      "https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg";
  } else {
    poster = props.movie.posterUrl;
  }
  return (
    <div>
      <p>{props.movie["movieName"]}</p>
      <p>{props.movie["releaseYear"]}</p>
      <Image src={poster} alt="wow" width={100} height={200} />
      <p>{props.movie["summary"]}</p>
      {props.confirmMovie == undefined ? (
        <></>
      ) : (
        <button
          onClick={() => {
            if (props.confirmMovie == undefined) {
              return;
            } else {
              props.confirmMovie(props.movie["movieId"]);
            }
          }}
        >
          Request
        </button>
      )}
    </div>
  );
}
