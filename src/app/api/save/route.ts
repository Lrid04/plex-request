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
  let postData: Movie = await req.json().catch((error) => {
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
    if (postData.requested == false) {
      return NextResponse.json({
        message: "Movie Already in Library",
        status: 401,
      });
    } else {
      return NextResponse.json({
        message: "Movie Already in Requested",
        status: 401,
      });
    }
  }

  oldData.push(postData);
  fs.writeFileSync("src/app/data/test.json", JSON.stringify(oldData));
  return NextResponse.json({ jsonData: postData }, { status: 200 });
}
