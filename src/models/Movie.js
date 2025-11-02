import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    coverImage: { type: String, required: true },
    director: { type: String },
    writer: { type: String },
    mainActors: { type: String },
    nationality: { type: String },
    releaseDate: { type: Date },
    rating: { type: Number },
    comment: { type: String }
}, { versionKey: false });

const movie = mongoose.model("movies", movieSchema);

export default movie;