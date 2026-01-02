import express from "express";

import DirectorController from "../controllers/DirectorController.js";
import paginationMiddleware from "../utils/queryHelpers.js";

const routes = express.Router();

routes.get("/director", DirectorController.listDirectors, paginationMiddleware);
routes.get("/director/:id", DirectorController.listDirectorsById);

routes.post("/director", DirectorController.registerDirector);

routes.put("/director/:id", DirectorController.updateDirector);

routes.delete("/director/:id", DirectorController.deleteDirector)

export default routes;