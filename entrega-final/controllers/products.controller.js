// controllers/products.controller.js

import * as productsService from '../services/products.service.js';

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error en getAllProducts:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error en getProductById:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// Crear un producto
export const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const created = await productsService.createProduct(newProduct);
    res.status(201).json(created);
  } catch (error) {
    console.error('Error en createProduct:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productsService.deleteProduct(id);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error en deleteProduct:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
