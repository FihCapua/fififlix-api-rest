import express from 'express';

const app = express();
app.use(express.json())

const movies = [
    {
        id: 1,
        titulo: "O Poderoso Chefão"
    },
    {
        id: 2,
        titulo: "Interstelar"
    }
]

app.get('/', (request, response) => {
    response.status(200).send('Curso de Node.js');
})

app.get('/movies', (request, response) => {
    response.status(200).json(movies);
})

app.post('/movies', (request, response) => {
    movies.push(request.body);
    response.status(201).send('Filme cadastrado com sucesso.')
})

export default app;