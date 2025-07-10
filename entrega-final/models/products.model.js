import { db } from '../config/firebase.js';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc
} from 'firebase/firestore';

const productsCollection = collection(db, 'products'); // acá obtenemos la referencia a la colección 'products'

export const getAllProducts = async () => {
  try {
    const productList = await getDocs(productsCollection);
    return productList.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw new Error('No se pudieron obtener los productos');
  }
};

export const getProductById = async (id) => {
  try {
    const productDoc = doc(db, 'products', id);
    const productList = await getDoc(productDoc);
    if (!productList.exists()) return null;
    return { id: productList.id, ...productList.data() };
  } catch (error) {
    console.error(`Error al obtener el producto con id ${id}:`, error);
    throw new Error('No se pudo obtener el producto');
  }
};

export const createProduct = async (product) => {
  try {
    const docRef = await addDoc(productsCollection, product); // docRef contiene una referencia al documento creado
    return { id: docRef.id, ...product }; // devolvemos el producto recibido, con su id creada
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw new Error(error.message || 'No se pudo crear el producto');
  }
};

export const deleteProduct = async (id) => {
  try {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
  } catch (error) {
    console.error(`Error al eliminar el producto con id ${id}:`, error);
    throw new Error(error.message || 'No se pudo eliminar el producto');
  }
};
