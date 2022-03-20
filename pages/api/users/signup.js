import jwt from 'jsonwebtoken';

import dbConnect from 'utils/dbConnect';
import User from 'models/User';

import { validateRequest } from 'middlewares/validateRequest';
import { BadRequestError } from 'errors/badRequestError';

const signUpUser = async(req, res) => {
	await dbConnect();
	validateRequest(req);

	const { email, password } = req.body;
	const existingUser = await User.findOne({ email });

	if (existingUser) {
		throw new BadRequestError('Użytkownik z tym adresem email już istnieje');
	}

	const user = new User({ email, password });
	await user.save();

	const token = jwt.sign(
		{
			_id: user._id,
			email: user.email
		}, 
		process.env.JWT_KEY,
		{
			expiresIn: 86400 // expires in 24 hours
		}
	);

	res.status(201).send({ user, token });
};

export default signUpUser;