import mongoose from "mongoose"
import { sendResponse } from "../utils/sendResponse.js"

// eslint-disable-next-line no-unused-vars
export function handleError (error, req, res, next) {
  console.log(error)
    
  if (error instanceof mongoose.Error.CastError) {
    sendResponse(res, 400, "Um ou mais dados fornecidos estão incorretos")
  } else if (error instanceof mongoose.Error.ValidationError) {
    sendResponse(res, 400, `Houve um erro de validação de dados: ${error.message}`)
  } else {
    sendResponse(res, 500, `${error.message} - Falha na requisição`)
  }
}