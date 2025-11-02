import movie from "../models/Movie.js";

class MovieController {
    
    static async listMovies (request, response) {
        const listMovies = await movie.find({})
        response.status(200).json(listMovies);
    }

    static async registerMovie (request, response) {
        try {
            const newMovie = await movie.create(request.body)
            response.status(201).json({ message: "Filme criado com sucesso", movie: newMovie })
        } catch (error) {
            response.status(500).json({ message: `${error.message} - Falha ao cadastrar filme.` })
        }
    }
}

export default MovieController