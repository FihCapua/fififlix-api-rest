import { director } from "../models/Director.js";

class DirectorController {    
  static async listDirectors (request, response) {
    try {
      const listDirectors = await director.find({})
      response.status(200).json(listDirectors);
    } catch (error) {
      response.status(500).json({ message: `${error.message} - Falha na requisição` })
    }
  }

  static async directorListById (request, response) {
    try {
      const id = request.params.id
      const foundDirector = await director.findById(id)
      response.status(200).json(foundDirector);
    } catch (error) {
      response.status(500).json({ message: `${error.message} - Falha na requisição` })
    }
  }

  static async registerDirector (request, response) {
    try {
      const newDirector = await director.create(request.body)
      response.status(201).json({ message: "Diretor criado com sucesso", director: newDirector })
    } catch (error) {
      response.status(500).json({ message: `${error.message} - Falha ao cadastrar filme.` })
    }
  }

  static async updateDirector (request, response) {
    try {
      const id = request.params.id
      await director.findByIdAndUpdate(id, request.body)
      response.status(200).json({ message: "Diretor atualizado" });
    } catch (error) {
      response.status(500).json({ message: `${error.message} - Falha na atualização do filme` })
    }
  }

  static async deleteDirector (request, response) {
    try {
      const id = request.params.id
      await director.findByIdAndDelete(id)
      response.status(200).json({ message: "Diretor removido" });
    } catch (error) {
      response.status(500).json({ message: `${error.message} - Falha ao remover o filme` })
    }
  }
}

export default DirectorController