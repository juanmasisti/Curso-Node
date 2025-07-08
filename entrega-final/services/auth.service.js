// services/auth.service.js

import jwt from 'jsonwebtoken';

const users = [
  { username: 'juanma', password: '123456' }
];

export const login = async (username, password) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return null;

  // Generar token JWT
  const token = jwt.sign({ username }, 'secret_jwt', { expiresIn: '1h' });
  return token;
};
