const AppError = require("./error-handler");
const StatusCode = require("http-status-codes");

class ValidationError extends AppError {
  constructor(error) {
    let errorName = error.name;
    let explaination = [];
    error.errors.forEach((err) => {
      explaination.push(err.message);
    });

    super(
      errorName,
      "Not able to validate the data sent in the request",
      explaination,
      StatusCode.default.BAD_REQUEST
    );
  }
}

module.exports = ValidationError;
