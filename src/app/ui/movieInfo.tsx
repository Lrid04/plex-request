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
  summary: boolean;
  confirmMovie?: CallableFunction | undefined;
}) {
  
  return (
    <Card className="flex items-center py-4 bg-primary min-w-full">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center text-center">
        <p className="font-black">Movie Name</p>
        <p className="truncate max-w-72 px-2">{props.movie["movieName"]}</p>
        <p className="font-black">Release Year</p>
        <p>{props.movie["releaseYear"]}</p>
      </CardHeader>
      <CardBody className="flex items-center p-4">
        <Image src={props.movie['posterUrl'] || "https://www.content.numetro.co.za/ui_images/no_poster.png"} height={400} alt="Movie Poster" className="object-cover overflow-visible"/>
        {props.summary && <div className="text-center"><p className="font-black">Summary</p><p>{props.movie['summary']}</p></div>}
      </CardBody>
      {(props.confirmMovie == undefined) && (
        <></>
      ) || (
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
            variant="shadow" 
            color="secondary"
          >
            Request
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
