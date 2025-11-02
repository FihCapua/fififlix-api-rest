import express from 'express';

import connectDatabase from './config/dbconnect.js';

import movie from './models/Movie.js';

const connection = await connectDatabase();

connection.on("error", (err) => {
    console.error('erro de conexão: ', err)
});

connection.once("open", () => {
    console.log("Conexão com o banco feita com sucesso!")
})

const app = express();
app.use(express.json())

app.get('/', (request, response) => {
    response.status(200).send('Curso de Node.js');
})

app.get('/movies', async (request, response) => {
    const listMovies = await movie.find({})
    response.status(200).json(listMovies);
})

app.get('/movies/:id', (request, response) => {
    const index = movieSearch(request.params.id);
    response.status(200).json(movie[index])
})

app.post('/movies', (request, response) => {
    movie.push(request.body);
    response.status(201).send('Filme cadastrado com sucesso.')
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
