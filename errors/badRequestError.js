import { CustomError } from "./customError";

export class BadRequestError extends CustomError {
	statusCode = 400;

	constructor(message) {
		super(message);

		// potrzebne ponieważ rozszerzam wbudowana klasę
		Object.setPrototypeOf(this, BadRequestError.prototype);
	};

	serializeErrors() {
		return [{ message: this.message }]
	};
};