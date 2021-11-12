class HandledError extends Error {
  constructor(res) {
    const { statusText, status } = res;
    super(statusText);
    this.name = 'HandledError';
    this.status = status;
  }
};

const isHandledError = (error) => {
  return error instanceof HandledError;
};

module.exports = {
  HandledError,
  isHandledError
};
