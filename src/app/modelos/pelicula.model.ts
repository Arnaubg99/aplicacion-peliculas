export interface Pelicula {
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
