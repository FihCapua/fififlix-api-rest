import { director } from "../models/Director.js";
import { sendResponse } from "../utils/sendResponse.js";

class DirectorController {    
  static async listDirectors (request, response) {
    try {
      const listDirectors = await director.find({})
      sendResponse(response, 200, "Diretores encontrados", listDirectors);
    } catch (error) {
      sendResponse(response, 500, `${error.message} - Falha na requisição`)
    }
  }

  static async listDirectorsById (request, response, next) {
    try {
      const id = request.params.id
      const foundDirector = await director.findById(id)

      if (foundDirector !== null) {
        sendResponse(response, 200, "Diretor encontrado", foundDirector);
      } else {
        sendResponse(response, 404, "Id do diretor não localizado")
      }

    } catch (error) {
      next(error)
    }
  }

  static async registerDirector (request, response, next) {
    try {
      const newDirector = await director.create(request.body)
      sendResponse(response, 201, "Diretor criado com sucesso", newDirector)
    } catch (error) {
      next(error)
    }
  }

  static async updateDirector (request, response, next) {
    try {
      const id = request.params.id
      await director.findByIdAndUpdate(id, request.body)
      sendResponse(response, 200, "Diretor atualizado");
    } catch (error) {
      next(error)
    }
  }

  static async deleteDirector (request, response, next) {
    try {
      const id = request.params.id
      await director.findByIdAndDelete(id)
      sendResponse(response, 200, "Diretor removido");
    } catch (error) {
      next(error)
    }
  }
}

export default DirectorController