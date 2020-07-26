import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import moviesRouter from './movies.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/movies', moviesRouter);

export default routes;
