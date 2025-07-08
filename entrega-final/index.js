// index.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// routes
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';

// inicializa variables de entorno, accede a .env
dotenv.config();

const app = express();

app.use(cors()); // habilita CORS, por defecto permite todas las solicitudes
app.use(bodyParser.json()); // parsea JSON en body de requests

// acá se definen las rutas
app.use('/api/products', productsRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando correctamente ✅');
});

// esto es si ninguna ruta coincide con las definidas antes
// 404 handler
app.use((req, res, next) => { // Middleware para manejar rutas no definidas (404)
  res.status(404).json({
    error: 'Ruta no encontrada!',
  });
});

// 500 handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
  });
});

// levantar el servidor 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
