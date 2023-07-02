import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Genre, Media, Type } from '../types/general';
import { API } from '../util/api';

type MediaState = {
  medias: {
    MOVIE: {
      [id: number]: {
        state: '' | 'LOADING' | 'LOADED' | 'ERROR';
        data: Media;
      };
    };
    TV: {
      [id: number]: {
        state: '' | 'LOADING' | 'LOADED' | 'ERROR';
        data: Media;
      };
    };
  };
};

export const media = createModel<RootModel>()({
  state: {
    medias: {
      MOVIE: {},
      TV: {},
    },
  } as MediaState,
  reducers: {
    setMedia(state, payload: { type: Type; id: number; data: Media }) {
      return {
        ...state,
        medias: {
          ...state.medias,
          [payload.type]: {
            ...state.medias[payload.type],
            [payload.id]: {
              state: 'LOADED',
              data: payload.data,
            },
          },
        },
      };
    },
    setMediaLoading(state, payload: { type: Type; id: number }) {
      return {
        ...state,
        medias: {
          ...state.medias,
          [payload.type]: {
            ...state.medias[payload.type],
            [payload.id]: {
              state: 'LOADING',
              data: [],
            },
          },
        },
      };
    },
  },
  effects: (dispatch) => ({
    async fetchMedia(
      { mediaId, type }: { mediaId: number; type: Type },
      state
    ) {
      dispatch.media.setMediaLoading({ type, id: mediaId });
      const r = await API.get('/v1/media/' + mediaId + '?type=' + type);
      dispatch.media.setMedia({ type, id: mediaId, data: r.data });
    },
  }),
});
