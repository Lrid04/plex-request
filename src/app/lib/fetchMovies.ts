import { Movie } from "./movie";

export function FetchMovies(
  movieName: FormDataEntryValue,
  movieYear: FormDataEntryValue | null
) {
  const movieSelect: Movie[] = [];
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
      json.results.map(
        (result: {
          id: number;
          title: string;
          release_date: string;
          overview: string;
          poster_path: string;
        }) => {
          let poster = ""
          if (result.poster_path == "" || result.poster_path == undefined){
            poster = "https://www.content.numetro.co.za/ui_images/no_poster.png";
          }else{
            poster = "https://image.tmdb.org/t/p/original/"+result.poster_path
          }
          movieSelect.push({
            movieId: result.id,
            movieName: result.title,
            releaseYear: Number(result.release_date.slice(0, 4)),
            summary: result.overview,
            posterUrl: poster,
            requested: false,
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  return movieSelect;
}
