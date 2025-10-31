import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: mongoose.Schema.Types.String, required: true },
    coverImage: { type: mongoose.Schema.Types.String, required: true },
    director: { type: mongoose.Schema.Types.String },
    writer: { type: mongoose.Schema.Types.String },
    mainActors: { type: mongoose.Schema.Types.String },
    nationality: { type: mongoose.Schema.Types.String },
    releaseDate: { type: mongoose.Schema.Types.Date },
    rating: { type: mongoose.Schema.Types.Number },
    comment: { type: mongoose.Schema.Types.String }
}, { versionKey: false });

const movie = mongoose.model("movies", movieSchema);

export default movie;