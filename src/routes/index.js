import express from "express";
import movies from "./movieRoutes.js"

const routes = (app) => {
    app.route('/').get((request, response) => response.status(200).send('Curso de Node.js'))

    app.use(express.json(), movies)
}

export default routes