import jwt from 'jsonwebtoken';
import * as usersModel from '../models/users.model.js'

// const users = [
//   { email: 'pepe@admin.com', password: '12345', role: 'admin' }
// ];

export const login = async (email, password) => {
  const user = await usersModel.getUserByEmail(email);
  if (!user) {
    return null; // Usuario no encontrado
  }

  // Validar password, ejemplo simple con te
  if (user.password !== password) {
    return null; // Password incorrecta
  }

  // Crear payload
  const payload = {
    email: user.email,
    role: user.role || 'user'
  };

  // Generar token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  return { token, user: payload };
};