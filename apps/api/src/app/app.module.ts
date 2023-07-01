import { Module } from '@nestjs/common';
import { GenresController } from './controller/genres';
import { TmdbService } from './services/tmdb';
import { SearchController } from './controller/search';
import { FinderController } from './controller/finder';

@Module({
  imports: [],
  controllers: [GenresController, SearchController, FinderController],
  providers: [TmdbService],
})
export class AppModule {}
