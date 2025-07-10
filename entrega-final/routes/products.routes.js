import { Router } from 'express';
import * as productsController from '../controllers/products.controller.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

// rutas para productos, invocando al controlador correspondiente y se agregó el middleware de autenticación
router.get('/', authenticateToken, productsController.getAllProducts);
router.get('/:id', authenticateToken, productsController.getProductById);
router.post('/create', authenticateToken, productsController.createProduct);
router.delete('/:id',authenticateToken, productsController.deleteProduct);

export default router;
