const BASE_URL = 'https://fakestoreapi.com/products';

const [,, method, resource, ...rest] = process.argv;

// path no se usa en este caso, pero puede servir si queremos manejar algo mas que "products".
const [path, id] = resource ? resource.split('/') : [];

async function main() {
  try {
    switch (method) {
      case 'GET':
        if (id) {
          const res = await fetch(`${BASE_URL}/${id}`);
          const data = await res.json();
          console.log(data);
        } else {
          const res = await fetch(BASE_URL);
          const data = await res.json();
          console.log(data);
        }
        break;

      case 'POST':
        const [title, price, category] = rest;
        const resPost = await fetch(BASE_URL, {
          method: 'POST',
          body: JSON.stringify({ title, price, category }),
          headers: { 'Content-Type': 'application/json' }
        });
        const postResult = await resPost.json();
        console.log('Producto creado:', postResult);
        break;

      case 'DELETE':
        if (!id) {
          console.log('No se proporcionó un ID para eliminar el producto');
          return;
        }
        const resDelete = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
        const deleteResult = await resDelete.json();
        console.log('Producto eliminado:', deleteResult);
        break;

      default:
        console.log('Método no reconocido');
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

// llamada a la función principal
main();
