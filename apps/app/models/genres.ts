import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Genre } from '../types/general';
import { API } from '../util/api';

type GenresState = {
  genres: {
    [id: number]: string;
  };
};

export const genres = createModel<RootModel>()({
  state: {
    genres: [],
  } as GenresState,
  reducers: {
    setGenres(
      state: GenresState,
      payload: {
        [id: number]: string;
      }
    ) {
      return { ...state, genres: payload };
    },
  },
  effects: (dispatch) => ({
    async fetchGenres(state) {
      const r1 = await API.get('/v1/genres?type=MOVIE');
      const r2 = await API.get('/v1/genres?type=TV');
      const genres = [...r1.data.genres, ...r2.data.genres];
      const obj = genres.reduce((acc: any, genre: Genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
      dispatch.genres.setGenres(obj);
    },
  }),
});
