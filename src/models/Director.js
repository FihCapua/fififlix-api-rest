import mongoose from "mongoose";

const directorSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { 
    type: String, 
    required: [true, "Nome do(a) diretor(a) é obrigatório"] 
  },
  birthDate: { type: Date },
  nationality: { type: String }
}, { versionKey: false });

const director = mongoose.model("directors", directorSchema);

export { director, directorSchema };