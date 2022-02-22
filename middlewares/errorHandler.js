import { CustomError } from 'errors/customError';

export const errorHandler = (err, req, res, next) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	};
	res.status(400).send({ errors: [{ message: 'Coś poszło nie tak' }] });
};