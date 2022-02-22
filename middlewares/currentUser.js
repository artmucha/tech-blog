import jwt from 'jsonwebtoken';

export const currentUser = (req, res) => {
    const token = req.headers['authorization'];

    if(!token) res.redirect('/logowanie');

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY);
        req.currentUser = payload;
    } catch(error) {}
};