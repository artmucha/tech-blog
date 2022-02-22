import { NotAuthorizedError } from 'errors/notAuthorizedError';

export const requireAuth = (req, res) => {
  if(!req.currentUser) throw new NotAuthorizedError();
}