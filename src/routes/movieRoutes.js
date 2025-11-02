import express from 'express';

import MovieController from '../controllers/MovieController.js';

const routes = express.Router();

routes.get('/movies', MovieController.listMovies)

export default routes;