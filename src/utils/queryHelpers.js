import { sendResponse } from "./sendResponse.js"

/**
* Applies pagination and sorting to a Mongoose query
* @param {Object} query - Mongoose Query
* @param {Object} queryParams - Request parameters (request.query)
* @param {Object} - Modified query
*/
export function applyPaginationAndSort(query, queryParams) {
  const { limit, page, ordered = "_id:-1" } = queryParams

  const [field, direction] = ordered.split(":")
  const sortOrder = parseInt(direction) === 1 ? 1 : -1
  query = query.sort({ [field]: sortOrder })

  if (limit || page) {
    const parsedLimit = Math.min(100, Math.max(1, parseInt(limit) || 10))
    const parsedPage = Math.max(1, parseInt(page) || 1)

    query = query
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit)
  }  

  return query
}

/**
 * Middleware for applying pagination and sorting
 * Expects request.query contain the Mongoose query
 */
async function paginationMiddleware(request, response) {
  try {
    if (request.result) {
      request.result = applyPaginationAndSort(request.result, request.query)
    }

    const result = await request.result

    sendResponse(response, 200, "Filmes encontrados", result);

  } catch (error) {
    sendResponse(response, 500, `${error.message} - Falha na requisição`)
  }
}

export default paginationMiddleware