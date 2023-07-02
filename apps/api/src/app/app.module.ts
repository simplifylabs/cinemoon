import { Module } from '@nestjs/common';
import { GenresController } from './controller/genres';
import { TmdbService } from './services/tmdb';
import { SearchController } from './controller/search';
import { FinderController } from './controller/finder';
import { MediaController } from './controller/media';

@Module({
  imports: [],
  controllers: [
    GenresController,
    SearchController,
    FinderController,
    MediaController,
  ],
  providers: [TmdbService],
})
export class AppModule {}
