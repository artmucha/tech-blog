import jwt from 'jsonwebtoken';

import dbConnect from 'utils/dbConnect';
import User from 'models/User';
import Password from 'services/password';

import { validateRequest } from 'middlewares/validateRequest';
import { BadRequestError } from 'errors/badRequestError';

const signInUser = async(req, res) => {
  await dbConnect();
	validateRequest(req);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) throw new BadRequestError('Niepoprawny adres e-mail');
  
  const isPasswordMatch = await Password.compare(user.password, password);
  if (!isPasswordMatch) throw new BadRequestError('Niepoprawne hasło');

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

export default signInUser;