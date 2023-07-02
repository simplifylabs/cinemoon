import { Models } from '@rematch/core';
import { genres } from './genres';
import { media } from './media';
export interface RootModel extends Models<RootModel> {
  genres: typeof genres;
  media: typeof media;
}
export const models: RootModel = { genres, media };
