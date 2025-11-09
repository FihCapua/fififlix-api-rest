import mongoose from "mongoose";

import { directorSchema } from "./Director.js";

const movieSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  genre: { type: String },
  writer: { type: String },
  mainActors: { type: String },
  nationality: { type: String },
  releaseDate: { type: Date },
  rating: { type: Number },
  comment: { type: String },
  director: directorSchema
}, { versionKey: false });

const movie = mongoose.model("movies", movieSchema);

export default movie;