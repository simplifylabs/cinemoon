import { Controller, Get, Param, Query, Version } from '@nestjs/common';
import { TmdbService } from '../services/tmdb';

import { IsIn, IsNotEmpty } from 'class-validator';

export class GetMediaQueryDto {
  @IsNotEmpty()
  @IsIn(['MOVIE', 'TV'])
  type: 'MOVIE' | 'TV';
}

@Controller('media')
export class MediaController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Version('1')
  @Get(':id')
  async findAll(@Query() query: GetMediaQueryDto, @Param('id') id) {
    return await this.tmdbService.getMedia(query.type, id);
  }
}
