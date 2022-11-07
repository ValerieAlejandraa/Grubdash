function methodNotAllowed(request, response, next) { //exports the 405 method not allowed handler function for use by the express application
  next({
    status: 405,
    message: `${request.method} not allowed for ${request.originalUrl}`,
  });
}

module.exports = methodNotAllowed;
