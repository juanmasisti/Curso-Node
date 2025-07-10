import { db } from '../config/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

const usersCollection = collection(db, 'users');

export const getUserByEmail = async (email) => {
  try {
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    // Devuelve el primer usuario encontrado
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error al obtener usuario por email:', error);
    throw new Error('No se pudo obtener el usuario');
  }
};
