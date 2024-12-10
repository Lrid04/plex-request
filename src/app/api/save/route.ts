import { NextRequest, NextResponse } from "next/server";
import { Movie } from "../../lib/movie";
import movies from "../../data/test.json";
import fs from "fs";

export async function GET() {
  const data: Movie[] = movies;
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest) {
  const oldData: Movie[] = movies;
  let postData: Movie = {
    movieId: 0,
    movieName: "",
    releaseYear: null,
    summary: "",
    posterUrl: "",
    requested: false,
  };
  await req
    .json()
    .then((data) => (postData = data))
    .catch((error) => {
      return NextResponse.json({ error }, { status: 500 });
    });

  if (postData == null) {
    return NextResponse.json(
      { message: "Error with passed data" },
      { status: 500 }
    );
  }

  if (
    movies.filter((object) => object.movieId == postData.movieId).length != 0
  ) {
    return NextResponse.json(
      { message: "Movie Already in Library", status: 500 }
    );
  }

  oldData.push(postData);
  fs.writeFileSync("src/app/data/test.json", JSON.stringify(oldData));
  return NextResponse.json({ jsonData: postData }, { status: 200 });
}
