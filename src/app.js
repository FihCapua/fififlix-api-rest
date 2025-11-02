import express from 'express';

import connectDatabase from './config/dbconnect.js';
import routes from './routes/index.js';

const connection = await connectDatabase();

connection.on("error", (err) => {
    console.error('erro de conexão: ', err)
});

connection.once("open", () => {
    console.log("Conexão com o banco feita com sucesso!")
})

const app = express();
routes(app)

app.get('/movies/:id', (request, response) => {
    const index = movieSearch(request.params.id);
    response.status(200).json(movie[index])
})

app.post('/movies', (request, response) => {
    movie.push(request.body);
})

app.put('/movies/:id', (request, response) => {
    const index = movieSearch(request.params.id);
    movie[index].title = request.body.title;
    response.status(200).json(movie);
})

app.delete('/movies/:id', (request, response) => {
    const index = movieSearch(request.params.id)
    movie.splice(index, 1)
    response.status(204).send("Filme excluído com sucesso.")
})

export default app;
