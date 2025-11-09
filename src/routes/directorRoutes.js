import express from "express";

import DirectorController from "../controllers/DirectorController.js";

const routes = express.Router();

routes.get("/director", DirectorController.listDirectors);
routes.get("/director/:id", DirectorController.directorListById);

routes.post("/director", DirectorController.registerDirector);

routes.put("/director/:id", DirectorController.updateDirector);

routes.delete("/director/:id", DirectorController.deleteDirector)

export default routes;