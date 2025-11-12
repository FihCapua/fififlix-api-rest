export function sendResponse(response, status, message, data = null, errors = null) {
  const success = status >= 200 && status < 300;

  return response.status(status).json({
    success,
    status,
    message,
    data,
    errors,
  });
}
