// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.store_id = decoded.store_id;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
}
