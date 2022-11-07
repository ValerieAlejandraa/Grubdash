function errorHandler(error, request, response, next) { //exports the error handler function for use by the express application
  // console.error(error);  // Commented out to silence tests.
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
}

module.exports = errorHandler;
