export interface arrayPeliculas {
  Response:     string;
  Search:       Search[];
  totalResults: string;
 }

  export interface Search {
  Poster: string;
  Title:  string;
  Type:   Type;
  Year:   string;
  imdbID: string;
 }

  enum Type {
  Movie = "movie",
  Series = "series",
  Episode = "episode"
 }
