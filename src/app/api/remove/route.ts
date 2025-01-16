"use server"
import { NextRequest, NextResponse } from "next/server";
import { Movie } from "../../lib/movie";
import movies from "../../data/mediaJson.json";
import fs from "fs";

export async function POST(req: NextRequest) {
  const oldData: Movie[] = movies;
  const postData: number = await req.json().catch((error) => {
    return NextResponse.json({ error }, { status: 500 });
  });
  if (postData == null) {
    return NextResponse.json(
      { message: "Error with passed data" },
      { status: 500 }
    );
  }
  const filterMovies: Movie[] = oldData.filter(
    (object) => object.movieId == postData
  );
  if (filterMovies.length != 0){
    oldData.splice(oldData.indexOf(filterMovies[0]),1)
    fs.writeFileSync("src/app/data/mediaJson.json", JSON.stringify(oldData));
    return NextResponse.json({ jsonData: postData }, { status: 200 });
  }
  return NextResponse.json({message: "Error Finding Movie", status: 404}, {status: 404})
}
