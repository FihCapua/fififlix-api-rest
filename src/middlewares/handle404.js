import { sendResponse } from "../utils/sendResponse.js"

// eslint-disable-next-line no-unused-vars
export function handle404 (req, res, next) {
  sendResponse(res, 404, "Página não encontrada.")
}