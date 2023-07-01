import { Controller, Get, Query, Version } from '@nestjs/common';
import { TmdbService } from '../services/tmdb';

import { IsIn, IsNotEmpty } from 'class-validator';

export class SearchDto {
  @IsNotEmpty()
  @IsIn(['MOVIE', 'TV'])
  type: 'MOVIE' | 'TV';
  @IsNotEmpty()
  query: string;
}

@Controller('search')
export class SearchController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Version('1')
  @Get()
  async search(@Query() query: SearchDto) {
    return await this.tmdbService.search(query.query, query.type);
  }
}
