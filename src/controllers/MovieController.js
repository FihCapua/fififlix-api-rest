import { director } from "../models/Director.js";
import movie from "../models/Movie.js";
import { sendResponse } from "../utils/sendResponse.js";

class MovieController {    
  static async listMovies (request, response, next) {
    try {
      const findMovies = movie.find()

      request.result = findMovies
 
      next()
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
      const searchFields = {
        title: "title",
        nationality: "nationality", 
        genre: "genre",
        director: "director.name"
      };

      const filter = {};

      for (const [param, field] of Object.entries(searchFields)) {
        if (request.query[param]) {
          filter[field] = { $regex: request.query[param], $options: "i" };
        }
      }

      const { minYear, maxYear } = request.query;

      if (minYear || maxYear) {
        filter.releaseDate = {};
  
        if (minYear) filter.releaseDate.$gte = new Date(`${minYear}-01-01`);
        if (maxYear) filter.releaseDate.$lte = new Date(`${maxYear}-12-31`);
      }

      const findMovies = movie.find(filter)

      request.result = findMovies

      next()
    } catch (error) {
      next(error);
    }
  }
}

export default MovieController