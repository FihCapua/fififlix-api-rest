import { director } from "../models/Director.js";
import movie from "../models/Movie.js";
import { sendResponse } from "../utils/sendResponse.js";

class MovieController {    
  static async listMovies (request, response, next) {
    try {
      const listMovies = await movie.find({})
      sendResponse(response, 200, "Filmes encontrados", listMovies);
    } catch (error) {
      next(error)
    }
  }

  static async movieListById (request, response, next) {
    try {
      const id = request.params.id
      const foundMovie = await movie.findById(id)

      if (foundMovie !== null) {
        sendResponse(response, 200, "Filme encontrado", foundMovie);
      } else {
        sendResponse(response, 404, "Id do filme não localizado")
      }
    } catch (error) {
      next(error)
    }
  }

  static async registerMovie (request, response, next) {
    const newMovie = request.body

    try {
      let fullMovie = { ...newMovie };

      if (newMovie.director) {
        const directorFound = await director.findById(newMovie.director);
      
        if (directorFound) {
          fullMovie = { ...newMovie, director: { ...directorFound._doc } };
        }
      }

      const movieCreated = await movie.create(fullMovie);

      sendResponse(response, 201, "Filme criado com sucesso", movieCreated) 
    } catch (error) {
      next(error)
    }
  }

  static async updateMovie (request, response, next) {
    try {
      const id = request.params.id
      const movieData = request.body

      let fullMovie = { ...movieData };

      if (movieData.director) {
        const directorFound = await director.findById(movieData.director)
      
        if (directorFound) {
          fullMovie = { ...movieData, director: { ...directorFound._doc } };
        }
      }

      const foundMovie = await movie.findByIdAndUpdate(id, fullMovie, {
        new: true,
        runValidators: true
      })

      if (foundMovie !== null) {
        sendResponse(response, 200, "Filme atualizado")
      } else {
        sendResponse(response, 404, "Id do filme não localizado")
      }
          
    } catch (error) {
      next(error)
    }
  }

  static async deleteMovie (request, response, next) {
    try {
      const id = request.params.id
      const foundMovie = await movie.findByIdAndDelete(id)

      if (foundMovie !== null) {
        sendResponse(response, 200, "Filme removido")
      } else {
        sendResponse(response, 404, "Id do filme não localizado")
      }
    } catch (error) {
      next(error)
    }
  }

  static async findMoviesByQuery(request, response, next) {
    try {
      const { title, nationality, genre, director } = request.query;
      let filter = {}

      if (title) filter.title = { $regex: title, $options: "i" };
      if (nationality) filter.nationality = { $regex: nationality, $options: "i" };
      if (genre) filter.genre = { $regex: genre, $options: "i" };
      if (director) filter["director.name"] = { $regex: director, $options: "i" };

      const moviesList = await movie.find(filter)

      if (moviesList.length === 0) {
        return sendResponse(response, 200, "Nenhum filme encontrado", [])
      }

      const moviesListLengthWord = moviesList.length > 1 ? "Filmes encontrados" : "Filme encontrado"

      return sendResponse(response, 200, moviesListLengthWord, moviesList)
    } catch (error) {
      next(error)
    }
  }
}

export default MovieController