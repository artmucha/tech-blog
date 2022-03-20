import dbConnect from 'utils/dbConnect';
import User from 'models/User';

export default async (req, res) => {

	await dbConnect();

  const { method } = req;

  switch(method) {
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).send(users);
      } catch(error) {
        res.status(400).send({success: false});
      }
      break;
    default: 
      res.status(400).send({success: false});
      break;
  }
};

