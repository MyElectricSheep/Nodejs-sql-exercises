const errorHandler = (err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .send(
      "An internal server error has occured. The error was logged, and the administrator has been notified"
    );
};

module.exports = errorHandler;
