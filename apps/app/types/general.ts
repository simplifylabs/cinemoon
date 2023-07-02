export type Type = 'MOVIE' | 'TV';

export type Genre = {
  id: number;
  name: string;
};

export type Media = {
  id: number;
  title: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  first_air_date: string;
  release_date: string;
  overview: string;
  popularity: number;
  is_adult: boolean;
};
