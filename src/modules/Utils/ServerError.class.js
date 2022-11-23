class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NBTNumberNotInRangeError extends ServerError {
  constructor(number, from, to) {
    super("The number " + number + " is not in the range between " + from + " and " + to);
    this.data = { number, from, to };
  }
}

module.exports = {
  ServerError,
  NBTNumberNotInRangeError
};
