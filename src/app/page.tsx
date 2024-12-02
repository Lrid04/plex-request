'use client'
import { useState, useEffect, FormEvent } from 'react'
import data from "./data/movies.json"
import MovieBlock from './ui/movieInfo'
import NavBar from './ui/header'

export type Movie = {
  movieId: number,
  movieName: string,
  releaseYear: number,
  posterUrl: string,
  requested: boolean
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovies, setNewMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies(data);
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const movieName = formData.get('movieName')
    const movieYear = formData.get('movieYear')
    if (movieName != null){
      fetchMovie(movieName, movieYear)
    }
    console.log(movieName, movieYear)
  }

  function fetchMovie(movieName: FormDataEntryValue, movieYear: FormDataEntryValue | null){
    let url = ""
    if (movieYear == ""){
      url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
    } else {
      url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1&year=${movieYear}`;
    }
      
    const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWE1NTRiNDg1MThmNjI3YmMwNWJlMzExNWI1ZmZlYSIsIm5iZiI6MTczMDkxMDAwNS45OTEwMDAyLCJzdWIiOiI2NzJiOTczNTFlOGRjZWM0YTYyYjhlZWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.SGmEZQyPBJRkzNgKQoSash8VKo1YXWUazv7S5rJRbIY'
      }
    }
    fetch(url, options)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      let movieSelect: Movie[] = []
      json.results.map(
        (result: { id: number; title: string; release_date: string; poster_path: string }) => {
          if (result != null){
          movieSelect.push({movieId: result.id, movieName: result.title, releaseYear: Number(result.release_date.slice(0,4)), posterUrl: `https://image.tmdb.org/t/p/original/${result.poster_path}`, requested: false})
          }
        }
      )
      setNewMovies(movieSelect)
      console.log(movieSelect)
      console.log(movies)
      console.log(newMovies)
    })
    .catch(err => console.error(err));
  }
  

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <div>
        <form onSubmit={handleSearch}>
            <label htmlFor="movieName">MovieName</label>
            <input type="text" id='movieName' name='movieName' className='text-black'/>
            <label htmlFor="movieYear">MovieYear</label>
            <input type="number" name="movieYear" id="movieYear" className='text-black'/>
            <input type="submit" value="Submit" />
        </form>
      </div>
      <div className='grid grid-cols-2 grid-flow-rows'>
        {newMovies.map((movie: Movie) => (
        <MovieBlock movie={movie} key={movie.movieId}/>
      ))}
      </div>
    </div>
  );
}
