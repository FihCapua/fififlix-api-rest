import movie from "../models/Movie.js";

class MovieController {    
    static async listMovies (request, response) {
        try {
            const listMovies = await movie.find({})
            response.status(200).json(listMovies);
        } catch (error) {
            response.status(500).json({ message: `${error.message} - Falha na requisição` })
        }
    }

    static async movieListById (request, response) {
        try {
            const id = request.params.id
            const foundMovie = await movie.findById(id)
            response.status(200).json(foundMovie);
        } catch (error) {
            response.status(500).json({ message: `${error.message} - Falha na requisição` })
        }
    }

    static async registerMovie (request, response) {
        try {
            const newMovie = await movie.create(request.body)
            response.status(201).json({ message: "Filme criado com sucesso", movie: newMovie })
        } catch (error) {
            response.status(500).json({ message: `${error.message} - Falha ao cadastrar filme.` })
        }
    }

    static async updateMovie (request, response) {
        try {
            const id = request.params.id
            await movie.findByIdAndUpdate(id, request.body)
            response.status(200).json({ message: "Filme atualizado" });
        } catch (error) {
            response.status(500).json({ message: `${error.message} - Falha na atualização do filme` })
        }
    }

    static async deleteMovie (request, response) {
        try {
            const id = request.params.id
            await movie.findByIdAndDelete(id)
            response.status(200).json({ message: "Filme removido" });
        } catch (error) {
            response.status(500).json({ message: `${error.message} - Falha ao remover o filme` })
        }
    }
}

export default MovieController