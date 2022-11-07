function notFound(request, response, next) { //exports the 404 Not Found handler function for use by the Express application
  next({ status: 404, message: `Path not found: ${request.originalUrl}` });
}

module.exports = notFound;
