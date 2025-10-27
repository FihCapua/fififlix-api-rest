import express, { response } from 'express';

const app = express();
app.use(express.json())

const movies = [
    {
        id: 1,
        title: "O Poderoso Chefão"
    },
    {
        id: 2,
        title: "Interstelar"
    }
]

const movieSearch = (id) => {
    return movies.findIndex((movie) => {
        return movie.id === Number(id)
    })
}

app.get('/', (request, response) => {
    response.status(200).send('Curso de Node.js');
})

app.get('/movies', (request, response) => {
    response.status(200).json(movies);
})

app.get('/movies/:id', (request, response) => {
    const index = movieSearch(request.params.id);
    response.status(200).json(movies[index])
})

app.post('/movies', (request, response) => {
    movies.push(request.body);
    response.status(201).send('Filme cadastrado com sucesso.')
})

app.put('/movies/:id', (request, response) => {
    const index = movieSearch(request.params.id);
    movies[index].title = request.body.title;
    response.status(200).json(movies);
})

export default app;