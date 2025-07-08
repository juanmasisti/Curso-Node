import { Router } from 'express';
import * as productsController from '../controllers/products.controller.js';

const router = Router();

// rutas para productos, invocando al controlador correspondiente
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/create', productsController.createProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;
