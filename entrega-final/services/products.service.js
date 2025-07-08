// services/products.service.js

// Mock database temporal (falta config y conexión con Firestore)
let products = [
  { id: '1', name: 'Laptop Asus', price: 900 },
  { id: '2', name: 'Monitor LG', price: 250 },
];

export const getAllProducts = async () => {
  return products;
};

export const getProductById = async (id) => {
  return products.find(p => p.id === id);
};

export const createProduct = async (product) => {
  const newProduct = { ...product, id: String(products.length + 1) };
  products.push(newProduct);
  return newProduct;
};

export const deleteProduct = async (id) => {
  products = products.filter(p => p.id !== id);
};
