import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { TmdbService } from '../services/tmdb';
import { IsArray, IsIn, IsNotEmpty } from 'class-validator';
import { Buffer } from 'buffer';

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
  async find(
    @Body() body: FindDto,
    @Headers('X-Preferences') preferences: string
  ) {
    let preferencesParsed;
    try {
      preferencesParsed = JSON.parse(
        Buffer.from(preferences, 'base64').toString('ascii')
      );
      if (!preferencesParsed.platforms) {
        throw new Error('Missing platforms in preferences');
      }
      if (!preferencesParsed.locale) {
        throw new Error('Missing locale in preferences');
      }
      if (!preferencesParsed.age) {
        throw new Error('Missing age in preferences');
      }
    } catch (e) {
      throw new BadRequestException('Missing X-Preferences header');
    }

    const results = await this.tmdbService.runFinder(
      body.type,
      body.genres,
      body.similar,
      preferencesParsed
    );
    return {
      results,
    };
  }
}
