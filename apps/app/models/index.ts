import { Models } from '@rematch/core';
import { genres } from './genres';
export interface RootModel extends Models<RootModel> {
  genres: typeof genres;
}
export const models: RootModel = { genres };
