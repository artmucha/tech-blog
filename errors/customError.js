export class CustomError extends Error {
  statusCode;

  constructor(message) {
		super(message);

		// potrzebne ponieważ rozszerzam wbudowana klasę
		Object.setPrototypeOf(this, CustomError.prototype);
  };

	serializeErrors() {
		return [{ message: 'Wystąpił błąd' }];
	}
};