import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TmdbService {
  private readonly accessToken: string = process.env.TMDB_ACCESS_TOKEN;
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  async getGenres(type: 'MOVIE' | 'TV') {
    const { data } = await axios.get(
      `${this.baseUrl}/genre/${type.toLowerCase()}/list`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );
    return data;
  }

  async search(query: string, type: 'MOVIE' | 'TV') {
    const { data } = await axios.get(
      `${this.baseUrl}/search/${type.toLowerCase()}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        params: {
          query,
        },
      }
    );

    // sort by popularity
    data.results.sort((a, b) => b.popularity - a.popularity);

    return data;
  }

  async getMedia(type: 'MOVIE' | 'TV', id: number) {
    const { data } = await axios.get(
      `${this.baseUrl}/${type.toLowerCase()}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );
    return data;
  }

  async runFinder(
    type: 'MOVIE' | 'TV',
    genres: number[],
    similar: number[],
    preferences: {
      platforms: string[];
      locale: string;
      age: number;
    }
  ) {
    try {
      // Fetch similar
      const similarPromises = similar.map(async (id) => {
        const { data } = await axios.get(
          `${this.baseUrl}/${type.toLowerCase()}/${id}/similar`,
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );
        return data;
      });

      let similarResults = await Promise.all(similarPromises);

      similarResults = similarResults.map((result) => {
        result.results.sort((a, b) => b.popularity - a.popularity);
        result.results = result.results.filter(
          (item) =>
            item.genre_ids.filter((id) => genres.includes(id)).length > 0
        );
        return result;
      });

      const { data } = await axios.get(
        `${
          this.baseUrl
        }/discover/${type.toLowerCase()}?with_genres=${genres.join(
          '|'
        )}&watch_region=${
          preferences.locale.split('_')[1]
        }&sort_by=popularity.desc&include_adult=${
          preferences.age < 18 ? false : true
        }&with_original_language=${
          preferences.locale.split('_')[0]
        }&release_date.gte=${new Date().getFullYear() - 2}-01-01`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      // construct result and place overlaps at the beginning
      const unique = [
        ...similarResults.reduce((acc, cur) => {
          return [...acc, ...cur.results];
        }, []),
        ...data.results,
      ].reduce((acc, cur) => {
        const found = acc.find((item) => item.id === cur.id);
        if (!found) {
          return [...acc, cur];
        }
        return acc;
      }, []);

      // Remove all where popularity is less than 10
      const filtered = unique.filter((item) => item.popularity > 10);

      // Sort by weight
      filtered.sort((a, b) => {
        const aWeight = similarResults.reduce((acc, cur) => {
          const found = cur.results.find((item) => item.id === a.id);
          if (found) {
            return acc + found.popularity;
          }
          return acc;
        }, 0);
        const bWeight = similarResults.reduce((acc, cur) => {
          const found = cur.results.find((item) => item.id === b.id);
          if (found) {
            return acc + found.popularity;
          }
          return acc;
        }, 0);
        return bWeight - aWeight;
      });

      // Return top 10
      return filtered.slice(0, 10);
    } catch (e) {
      console.log(e?.response?.data || e);
    }
  }
}
