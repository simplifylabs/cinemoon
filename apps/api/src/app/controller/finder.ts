import { Body, Controller, Get, Post, Query, Version } from '@nestjs/common';
import { TmdbService } from '../services/tmdb';
import { IsArray, IsIn, IsNotEmpty } from 'class-validator';

export class FindDto {
  @IsNotEmpty()
  @IsIn(['MOVIE', 'TV'])
  type: 'MOVIE' | 'TV';
  @IsArray()
  genres: number[];
  @IsArray()
  similar: number[];
}

@Controller('finder')
export class FinderController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Version('1')
  @Post()
  async find(@Body() body: FindDto) {
    const results = await this.tmdbService.runFinder(
      body.type,
      body.genres,
      body.similar
    );
    return {
      results,
    };
  }
}
