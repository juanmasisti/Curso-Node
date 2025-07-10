// controllers/products.controller.js

import * as productsService from '../services/products.service.js';

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error en getAllProducts:', error);
    res.status(500).json({ error: error.message || 'Error al obtener los productos' });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    // Validar que se haya enviado un id
    if (!id){
      return res.status(400).json({ error: 'El id es obligatorio' }); 
    }
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
    // Destructuring de los campos del producto desde el body de la request.
    const { name, price, category, description, stock, sku, imageUrl } = req.body;

    // Por modelo, name y price son obligatorios, el resto opcionales
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'El nombre del producto es obligatorio y debe ser un string' });
    }

    if (price === undefined || typeof price !== 'number' || price < 0) {
      return res.status(400).json({ error: 'El precio es obligatorio y no debe ser negativo' });
    }

    if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
      return res.status(400).json({ error: 'El stock debe ser un número positivo' });
    }
    const newProduct = {
      name,
      price,
      stock: stock ?? 0, // si no se envía stock, lo setea en 0
      description: description ?? '',
      imageUrl: imageUrl ?? '',
      category: category ?? '',
      sku: sku ?? '',
    };
    const created = await productsService.createProduct(newProduct);
    res.status(201).json({message: 'Producto creado correctamente: ', product: created});
  } catch (error) {
    console.error('Error en createProduct:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Verificar si el producto existe antes de eliminarlo 
    const product = await productsService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Eliminar producto
    await productsService.deleteProduct(id);

    res.json({ message: 'Producto eliminado correctamente' });  } catch (error) {
    console.error('Error en deleteProduct:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
