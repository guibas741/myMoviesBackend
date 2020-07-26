/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import Movie from '../models/Movie';

interface Request {
  movie: {
    Title: string;
    Year: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Poster: string;
  };
  user_id: string;
}

class WatchMovieService {
  public async execute({ movie, user_id }: Request): Promise<Movie> {
    const moviesRepository = getRepository(Movie);

    const userWatchMovie = await moviesRepository.findOne({
      where: {
        title: movie.Title,
        user_id,
        year: movie.Year,
      },
    });

    if (userWatchMovie) {
      throw new Error('User already watch this movie');
    }

    const movieWatched = moviesRepository.create({
      user_id,
      title: movie.Title,
      year: movie.Year,
      description: movie.Plot,
      genre: movie.Genre,
      duration: movie.Runtime,
      actors: movie.Actors,
      director: movie.Director,
      poster_url: movie.Poster,
    });

    await moviesRepository.save(movieWatched);

    return movieWatched;
  }
}

export default WatchMovieService;
