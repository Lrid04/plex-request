import { Movie } from "./movie";

export function FetchMovies(
  movieName: FormDataEntryValue,
  movieYear: FormDataEntryValue | null
) {
  let movieSelect: Movie[] = [];
  let url: string = "";
  if (movieYear == "") {
    url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
  } else {
    url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1&year=${movieYear}`;
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWE1NTRiNDg1MThmNjI3YmMwNWJlMzExNWI1ZmZlYSIsIm5iZiI6MTczMDkxMDAwNS45OTEwMDAyLCJzdWIiOiI2NzJiOTczNTFlOGRjZWM0YTYyYjhlZWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.SGmEZQyPBJRkzNgKQoSash8VKo1YXWUazv7S5rJRbIY",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      json.results.map(
        (result: {
          id: number;
          title: string;
          release_date: string;
          poster_path: string;
        }) => {
          movieSelect.push({
            movieId: result.id,
            movieName: result.title,
            releaseYear: Number(result.release_date.slice(0, 4)),
            posterUrl: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
            requested: false,
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  console.log(movieSelect);
  return movieSelect;
}
