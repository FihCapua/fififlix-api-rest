import express from "express";

import MovieController from "../controllers/MovieController.js";
import paginationMiddleware from "../utils/queryHelpers.js";

const routes = express.Router();

routes.get("/movies", MovieController.listMovies, paginationMiddleware);
routes.get("/movies/query", MovieController.findMoviesByQuery, paginationMiddleware);
routes.get("/movies/:id", MovieController.movieListById);

routes.post("/movies", MovieController.registerMovie);

routes.put("/movies/:id", MovieController.updateMovie);

routes.delete("/movies/:id", MovieController.deleteMovie)

export default routes;