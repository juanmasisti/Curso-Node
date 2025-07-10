import * as productsModel from '../models/products.model.js';

export const getAllProducts = async () => { // acá puede haber mas validaciones
  return await productsModel.getAllProducts();
};

export const getProductById = async (id) => {
  return await productsModel.getProductById(id);
};

export const createProduct = async (product) => {
  return await productsModel.createProduct(product);
};

export const deleteProduct = async (id) => {
  return await productsModel.deleteProduct(id);
};
