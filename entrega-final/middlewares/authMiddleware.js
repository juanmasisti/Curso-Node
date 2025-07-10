import jwt from 'jsonwebtoken';

// Este middleware se usa para proteger rutas que requieren autenticación
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Header: Authorization: Bearer token
  const token = authHeader && authHeader.split(' ')[1]; // Extrae el token

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { 
    // Si hay un error, el token es inválido o expiró
    if (err) {
      console.error('Error al verificar token:', err);
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    // Si el token es válido, se decodifica y sigue 
    req.user = user; // Para que el controlador pueda acceder a la información del usuario
    next(); // Llama al siguiente middleware o controlador
  });
};
