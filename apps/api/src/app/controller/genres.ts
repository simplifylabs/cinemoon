import { Controller, Get, Query, Version } from '@nestjs/common';
import { TmdbService } from '../services/tmdb';

import { IsIn, IsNotEmpty } from 'class-validator';

export class GetGenresDto {
  @IsNotEmpty()
  @IsIn(['MOVIE', 'TV'])
  type: 'MOVIE' | 'TV';
}

@Controller('genres')
export class GenresController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Version('1')
  @Get()
  async findAll(@Query() query: GetGenresDto) {
    return await this.tmdbService.getGenres(query.type);
  }
}
