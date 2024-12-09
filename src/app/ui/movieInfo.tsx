// import Image from "next/image";
import { Movie } from "../lib/movie";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

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
    <Card className="flex items-center py-4 bg-primary">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <p>Movie Name: {props.movie["movieName"]}</p>
        <p>Release Year: {props.movie["releaseYear"]}</p>
      </CardHeader>
      <CardBody className="flex items-center overflow-visible">
        <Image src={poster} alt="Movie Poster" className="object-cover" height={500}/>
      </CardBody>
      {props.confirmMovie == undefined ? (
        <></>
      ) : (
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              if (props.confirmMovie == undefined) {
                return;
              } else {
                props.confirmMovie(props.movie["movieId"]);
              }
            }}
            size="lg"
          >
            Request
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
