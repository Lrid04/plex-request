'use client'
import { useState, useEffect } from 'react'
import data from "./data/movies.json"

type Movie = {
  movieId: number,
  movieName: string,
  releaseYear: number,
  posterUrl: string
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies(data);
  }, []);
  
  movies.map(
    movie => {
      console.log(movie)
    }
  )
  console.log(movies)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
    </div>
  );
}
