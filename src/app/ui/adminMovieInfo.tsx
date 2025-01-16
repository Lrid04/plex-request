import { ConfirmRequest, DeleteRequest } from "../lib/adminControls";
import { Movie } from "../lib/movie";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

export default function AdminMovieBlock(props: { movie: Movie }) {
  function AddLibrary() {
    ConfirmRequest(props.movie.movieId);
  }

  function RemoveRequest() {
    DeleteRequest(props.movie.movieId);
  }

  return (
    <Card className="flex items-center py-4 bg-primary min-w-full">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center text-center">
        <p className="font-black">Movie Name</p>
        <p className="truncate max-w-72 px-2">{props.movie["movieName"]}</p>
        <p className="font-black">Release Year</p>
        <p>{props.movie["releaseYear"]}</p>
      </CardHeader>
      <CardBody className="flex items-center p-4">
        <Image
          src={
            props.movie["posterUrl"] ||
            "https://www.content.numetro.co.za/ui_images/no_poster.png"
          }
          height={500}
          alt="Movie Poster"
          className="object-cover overflow-visible"
        />
      </CardBody>
      <CardFooter className="flex justify-evenly">
        <Button
          size="lg"
          variant="shadow"
          color="secondary"
          onClick={AddLibrary}
          onTouchStart={AddLibrary}
        >
          Added
        </Button>
        <Button
          size="lg"
          variant="shadow"
          color="secondary"
          onClick={RemoveRequest}
          onTouchStart={RemoveRequest}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
