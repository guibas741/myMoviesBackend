/* eslint-disable camelcase */
import { Router } from 'express';
import WatchMovieService from '../services/WatchMovieService';

const moviesRouter = Router();

moviesRouter.post('/', async (request, response) => {
  try {
    console.log(request.body);
    const { movie, user_id } = request.body;

    const watchMovieService = new WatchMovieService();

    const watchedMovie = await watchMovieService.execute({
      user_id,
      movie,
    });

    return response.json({ watchedMovie });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default moviesRouter;
