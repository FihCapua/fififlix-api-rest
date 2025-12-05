import mongoose from "mongoose";

import { directorSchema } from "./Director.js";

const movieSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { 
    type: String, 
    required: [true, "Título do filme é obrigatório"] 
  },
  coverImage: { 
    type: String, 
    required: [true, "Imagem de capa do filme é obrigatório"] 
  },
  genre: { type: String },
  writer: { type: String },
  mainActors: { type: String },
  nationality: { type: String },
  releaseDate: { type: Date },
  rating: { 
    type: Number,
    validate: {
      validator: (value) => {
        return value >= 0 && value <= 5
      },
      message: "O valor de avaliação do filme deve estar entre 0 e 5. Valor fornecido {VALUE}"
    }
  },
  comment: { type: String },
  director: directorSchema
}, { versionKey: false });

const movie = mongoose.model("movies", movieSchema);

export default movie;