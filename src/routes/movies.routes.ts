import { getRepository } from 'typeorm';
/* eslint-disable camelcase */
import { Router } from 'express';
import WatchMovieService from '../services/WatchMovieService';
import Movie from '../models/Movie';

const moviesRouter = Router();

moviesRouter.post('/', async (request, response) => {
  try {
    const { movie, user_id } = request.body;

    const watchMovieService = new WatchMovieService();

    const watchedMovie = await watchMovieService.execute({
      user_id,
      movie,
    });

    return response.json(watchedMovie);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

moviesRouter.get('/', async (request, response) => {
  try {
    const moviesRepository = getRepository(Movie);

    const { user_id, favorites } = request.headers;

    let movieList = [];
    if (favorites) {
      movieList = await moviesRepository.find({
        where: { user_id, is_favorite: true },
      });
    } else {
      movieList = await moviesRepository.find({ where: { user_id } });
    }

    return response.json(movieList);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

moviesRouter.put('/', async (request, response) => {
  try {
    const moviesRepository = getRepository(Movie);
    const { user_id, movie_id } = request.body;

    const movie = await moviesRepository.findOne({
      where: { user_id, id: movie_id },
    });

    if (!movie) {
      throw new Error('Movie not found');
    }

    movie.is_favorite = !movie.is_favorite;

    await moviesRepository.save(movie);

    return response.json(movie);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

moviesRouter.delete('/', async (request, response) => {
  try {
    const moviesRepository = getRepository(Movie);
    const { user_id, movie_id } = request.body;

    const movie = await moviesRepository.findOne({
      where: { user_id, id: movie_id },
    });

    if (!movie) {
      throw new Error('Movie not found');
    }

    await moviesRepository.remove(movie);

    return response
      .status(204)
      .json({ success: 'Movie remove from watch list' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default moviesRouter;
