import { director } from "../models/Director.js";
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
    const newMovie = request.body

    try {
      const directorFound = await director.findById(newMovie.director)

      const fullMovie = { ...newMovie, director: { ...directorFound._doc } }
      const movieCreated = await movie.create(fullMovie);

      response.status(201).json({ message: "Filme criado com sucesso", movie: movieCreated })
    } catch (error) {
      response.status(500).json({ message: `${error.message} - Falha ao cadastrar filme.` })
    }
  }

  static async updateMovie (request, response) {
    try {
      const id = request.params.id
      const movieData = request.body

      if (movieData.director) {
        const directorFound = await director.findById(movieData.director)
        const fullMovie = { ...movieData, director: { ...directorFound._doc } }

        await movie.findByIdAndUpdate(id, fullMovie)
      } else {
        await movie.findByIdAndUpdate(id, movieData)
      }
            
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

  static async findMoviesByQuery(request, response) {
    try {
      const { title, nationality, genre, director } = request.query;
      let filter = {}

      if (title) filter.title = { $regex: title, $options: "i" };
      if (nationality) filter.nationality = { $regex: nationality, $options: "i" };
      if (genre) filter.genre = { $regex: genre, $options: "i" };

      if (director) filter["director.name"] = { $regex: director, $options: "i" };

      const moviesList = await movie.find(filter)
      response.status(200).json(moviesList)
    } catch (error) {
      response.status(500).json({ message: `${error.message} - Falha na requisição` })
    }
  }
}

export default MovieController