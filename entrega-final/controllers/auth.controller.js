// controllers/auth.controller.js

import * as authService from '../services/auth.service.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    if (!token) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al autenticar' });
  }
};
