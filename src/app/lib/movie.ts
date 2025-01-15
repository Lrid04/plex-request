export type Movie = {
  movieId: number;
  movieName: string;
  releaseYear: number | null;
  summary: string;
  posterUrl: string | null;
  requested: boolean;
};
