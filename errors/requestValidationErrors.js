import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
	statusCode = 400;

	constructor(errors) {
		super('Invalid Request parameter');

		// potrzebne ponieważ rozszerzam wbudowana klasę
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	};

	serializeErrors() {
		return this.errors.map(error => {
			return { message: error.msg, field: error.param };
		});
	};
};